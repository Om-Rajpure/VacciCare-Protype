import { useStore } from '../../store/useStore';
import { Download, QrCode, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useRef, useState, useEffect, useMemo } from 'react';
import QRCodeLib from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

export function VaccinationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const selectedMemberId = useStore(state => state.selectedMemberId);
  const member = useStore(state => state.familyMembers.find(m => m.id === state.selectedMemberId));
  const allVaccines = useStore(state => state.vaccines);

  // Memoize completed vaccines for the selected member
  const completedVaccines = useMemo(() => {
    return allVaccines.filter(v => v.memberId === selectedMemberId && v.status === 'completed');
  }, [allVaccines, selectedMemberId]);

  // Memoize the QR code data to avoid unnecessary recalculations
  const qrData = useMemo(() => {
    if (!member) return null;
    return JSON.stringify({
      name: member.name,
      birthdate: member.birthdate,
      gender: member.gender,
      vaccinations: completedVaccines.map(v => ({
        name: v.vaccineName,
        date: v.completedDate,
        status: v.status
      }))
    });
  }, [member, completedVaccines]);

  // Generate QR code when data changes
  useEffect(() => {
    if (qrData) {
      QRCodeLib.toDataURL(qrData, { width: 200 })
        .then(setQrCodeUrl)
        .catch(console.error);
    } else {
      setQrCodeUrl('');
    }
  }, [qrData]);

  const handleDownloadPDF = async () => {
    if (!cardRef.current || !member) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${member.name}_vaccination_card.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!member) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Select a family member to view vaccination card</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div ref={cardRef} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Vaccination Card</h2>
            <p className="text-sm text-gray-500 font-medium">{member.name}</p>
          </div>
          {qrCodeUrl && (
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
              <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#F7FBFF] p-3 rounded-2xl border border-[#4CC9F0]/20">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Date of Birth</p>
            <p className="text-sm font-bold text-gray-800">
              {format(new Date(member.birthdate), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="bg-[#F7FBFF] p-3 rounded-2xl border border-[#4CC9F0]/20">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Age</p>
            <p className="text-sm font-bold text-gray-800">{member.age} years</p>
          </div>
          <div className="bg-[#F7FBFF] p-3 rounded-2xl border border-[#4CC9F0]/20">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Gender</p>
            <p className="text-sm font-bold text-gray-800 capitalize">{member.gender}</p>
          </div>
          <div className="bg-[#F7FBFF] p-3 rounded-2xl border border-[#4CC9F0]/20">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Status</p>
            <p className="text-sm font-bold text-gray-800">{completedVaccines.length} completed</p>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-3">Vaccination History</h3>

          {completedVaccines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No vaccinations completed yet</p>
            </div>
          ) : (
            completedVaccines.map((vaccine) => {
              // Delay calculation
              const dueDate = vaccine.dueDate ? new Date(vaccine.dueDate) : null;
              const takenDate = vaccine.completedDate ? new Date(vaccine.completedDate) : null;
              const delayDays =
                dueDate && takenDate
                  ? Math.ceil((takenDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
                  : null;

              const delayBadge =
                delayDays === null
                  ? null
                  : delayDays <= 0
                    ? { label: 'On Time', classes: 'bg-green-100 text-green-700 border border-green-200' }
                    : delayDays <= 7
                      ? { label: `Taken ${delayDays} day${delayDays > 1 ? 's' : ''} late`, classes: 'bg-orange-100 text-orange-700 border border-orange-200' }
                      : { label: `Taken ${delayDays} days late`, classes: 'bg-red-100 text-red-700 border border-red-200' };

              return (
                <div key={vaccine.id} className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 leading-tight truncate">{vaccine.vaccineName}</p>
                        {dueDate && (
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Due: {format(dueDate, 'dd MMM yyyy')}
                          </p>
                        )}
                        {vaccine.completedDate && (
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Taken: {format(new Date(vaccine.completedDate), 'dd MMM yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                    {delayBadge && (
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${delayBadge.classes}`}>
                        {delayBadge.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-3">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}