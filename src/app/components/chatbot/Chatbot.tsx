import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minus, Send, Bot, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBotResponse, welcomeMessage, Message } from './chatbotData';

const SUGGESTION_CHIPS = [
  { label: '💉 Side Effects', query: 'side effects after vaccination' },
  { label: '⏰ Missed Vaccine', query: 'what to do if vaccine is missed or delayed' },
  { label: '📅 Next Due Date', query: 'vaccination schedule and next due date' },
  { label: '🏥 Nearby Center', query: 'find nearby vaccination center clinic' },
  { label: '🤒 Fever Care', query: 'fever after vaccination home care' },
  { label: '📋 Schedule Info', query: 'complete vaccination schedule India' },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowChips(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleSendMessage = () => sendMessage(inputValue);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-28 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#2EC4B6] to-[#4CC9F0] rounded-full shadow-lg shadow-teal-300/50 flex items-center justify-center transition-all hover:shadow-xl ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Vaccine Assistant"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? 'auto' : '540px' }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`fixed bottom-28 right-6 z-50 w-[370px] max-w-[calc(100vw-3rem)] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col ${isMinimized ? 'h-auto max-h-[60px]' : 'h-[540px]'}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2EC4B6] to-[#4CC9F0] px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">VacciCare Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full" />
                    <p className="text-white/80 text-xs">AI Vaccine Advisor</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => setIsMinimized(!isMinimized)} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => { setIsOpen(false); setIsMinimized(false); }} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Disclaimer Banner */}
            {!isMinimized && (
              <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-start space-x-2 shrink-0">
                <Info className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  <strong>Not a substitute for medical consultation.</strong> Always consult a qualified healthcare professional for medical decisions.
                </p>
              </div>
            )}

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7FBFF]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[88%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${message.sender === 'user' ? 'bg-[#4CC9F0]' : 'bg-[#2EC4B6]'}`}>
                          {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`px-4 py-3 rounded-[18px] ${message.sender === 'user' ? 'bg-[#4CC9F0] text-white rounded-tr-[4px]' : 'bg-white text-gray-800 rounded-tl-[4px] shadow-sm border border-gray-100'}`}>
                          <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                          <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                      <div className="flex items-end space-x-2">
                        <div className="w-7 h-7 rounded-full bg-[#2EC4B6] flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-[18px] rounded-tl-[4px] shadow-sm border border-gray-100">
                          <div className="flex space-x-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay }} className="w-2 h-2 bg-[#2EC4B6] rounded-full" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestion Chips */}
                {showChips && (
                  <div className="px-3 py-2 bg-white border-t border-gray-100 shrink-0">
                    <p className="text-[10px] text-gray-400 mb-2 font-medium">Quick questions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTION_CHIPS.map((chip) => (
                        <button
                          key={chip.label}
                          onClick={() => sendMessage(chip.query)}
                          className="text-[11px] px-2.5 py-1 bg-[#F7FBFF] border border-[#2EC4B6]/30 text-[#2EC4B6] rounded-full hover:bg-[#2EC4B6] hover:text-white transition-colors font-medium whitespace-nowrap"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                  <div className="flex items-center space-x-2 bg-[#F7FBFF] rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#2EC4B6] focus-within:ring-2 focus-within:ring-[#2EC4B6]/20 transition-all">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about vaccines, side effects..."
                      className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-[#2EC4B6] hover:bg-[#25a094]' : 'bg-gray-200 cursor-not-allowed'}`}
                    >
                      <Send className={`w-4 h-4 ${inputValue.trim() ? 'text-white' : 'text-gray-400'}`} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
