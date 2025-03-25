'use client'
import Button from '@/components/global/Button/Button'
import InputText from '@/components/global/Input/InputText'
import { useGetChatAiMutation } from '@/redux/services/chatAi.service'
import { formatAgentResponse } from '@/utils/formatAgentResponse'
import { MessageCircle, X } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillMessage, AiOutlineSend } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

type Message = {
  user_message: string
  isUser: boolean
  timestamp: Date
}

export default function ChatAgent() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const [postMessage, { isLoading: messageLoading }] = useGetChatAiMutation()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  //=====================================
  //        RENDER
  //=====================================
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  //=====================================
  //          MESSAGE LOGIC
  //=====================================
  const handleSend = async () => {
    if (!input.trim()) return
    if (messageLoading) return
    const userMessage: Message = {
      user_message: input,
      isUser: true,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    await handleGenerateResponse(input)
  }

  async function handleGenerateResponse(userMessage: string) {
    try {
      setMessages((prev) => [...prev, { user_message: '...', isUser: false, timestamp: new Date() }])

      const response = await postMessage({ user_message: userMessage }).unwrap()
      setMessages((prev) => {
        const updatedMessages = [...prev]
        updatedMessages[updatedMessages.length - 1] = {
          user_message: response.response || 'Sorry, I cannot understand that',
          isUser: false,
          timestamp: new Date()
        }
        return updatedMessages
      })
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [...prev]
        updatedMessages[updatedMessages.length - 1] = {
          user_message: 'Sorry, something went wrong. Please try again.',
          isUser: false,
          timestamp: new Date()
        }
        return updatedMessages
      })
    }
  }

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && (
          <div className='bg-white rounded-2xl shadow-2xl w-[500px] h-[650px] flex flex-col overflow-hidden'>
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-500 to-sky-400 text-white p-4 flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <MessageCircle className='h-6 w-6' />
                <h1 className='text-lg font-bold'>Edutrail Blaze AI</h1>
              </div>
              <Button
                variant='danger'
                size='sm'
                onClick={() => setIsOpen(false)}
                className='hover:bg-red-700 rounded-full p-1 transition-colors'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-sky-400 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.user_message === '...' ? (
                      <div className='flex flex-row'>
                        <FaSpinner size={20} className='me-2 animate-spin' />
                        <div>Assistant is thinking...</div>
                      </div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatAgentResponse(message.user_message)
                        }}
                        className={`prose prose-sm max-w-none ${message.isUser ? 'text-white' : ''}`}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className='p-4 border-t flex gap-2'>
              <div className='flex-1'>
                <InputText
                  name='message'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type your message...'
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={messageLoading}
                  noLayout
                />
              </div>
              <Button
                className='bg-gradient-to-r from-blue-500 to-sky-400'
                onClick={handleSend}
                isLoading={messageLoading}
              >
                {messageLoading ? '' : <AiOutlineSend className='h-5 w-5' />}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className='rounded-full bg-gradient-to-r from-blue-500 to-sky-400 shadow-2xl hover:scale-105 transition-all'
        >
          <AiFillMessage size={30} />
        </Button>
      )}
    </div>
  )
}
