import React, { useState } from 'react'
import MenuItem from '../Select/MenuItem'
import CloseButton from '../Button/CloseButton'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

/* CHANGED: Thêm interface Status */
interface Status {
  label: string
  color: string
}

/* CHANGED: Thêm Status[] vào union type của value */
interface DetailField {
  label: string
  value: string | React.ReactNode | Status[]
  isDate?: boolean
  isImage?: boolean
  isVideo?: boolean
  isID?: boolean
  isStatus?: boolean
  isName?: boolean
}

interface DetailWidget {
  label: string
  content: string
}

interface ActionItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
}

interface DetailPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  fields: DetailField[]
  widgets?: DetailWidget[]
  actions?: ActionItem[]
}

export default function DetailPopup({ isOpen, onClose, title, fields, widgets, actions }: DetailPopupProps) {
  const idField = fields.find((field) => field.isID)
  const otherFields = fields.filter((field) => !field.isID)

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='absolute inset-0 bg-black bg-opacity-70' onClick={onClose} />
      <div
        className={`relative ml-auto h-full w-full max-w-xl bg-white shadow-lg
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col`}
      >
        {/* Thanh action bar  */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <CloseButton onClick={onClose} />
          {actions && actions.length > 0 && (
            <MenuItem
              items={actions.map((action) => ({
                label: action.label,
                onClick: action.onClick,
                icon: action.icon
              }))}
            />
          )}
        </div>

        {/* Nội dung chi tiết */}
        <div className='p-6 overflow-auto'>
          <h2 className='text-2xl font-bold mb-4'>
            {title}
            {idField && typeof idField.value === 'number' && (
              <span className='text-gray-400 text-sm ml-2'>#{idField.value}</span>
            )}{' '}
          </h2>

          {/* others field  */}
          <div className='space-y-4'>
            {otherFields.map((field, idx) => {
              let displayValue: React.ReactNode

              if (field.isStatus && Array.isArray(field.value)) {
                displayValue = (
                  <div className='flex gap-2'>
                    {(field.value as Status[]).map((status, sIdx) => (
                      <span
                        key={sIdx}
                        className='px-2 py-1 rounded text-white text-xs'
                        style={{ backgroundColor: status.color }}
                      >
                        {status.label}
                      </span>
                    ))}
                  </div>
                )
              } else if (field.isDate && typeof field.value === 'string') {
                displayValue = <FormatDateTime date={field.value} />
              } else if (field.isImage && typeof field.value === 'string') {
                displayValue = <img src={field.value} alt={field.label} className='max-w-[200px] h-auto rounded' />
              } else if (field.isVideo && typeof field.value === 'string') {
                displayValue = (
                  <video controls className='max-w-[300px] h-auto'>
                    <source src={field.value} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                )
              } else {
                // CHANGED: Nếu không thuộc các kiểu đặc biệt, ép về React.ReactNode
                displayValue = field.value as React.ReactNode
              }

              if (field.isName) {
                displayValue = (
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
                    {displayValue}
                  </span>
                )
              }

              return (
                <div key={idx} className='flex items-start justify-between'>
                  <span className='text-gray-500 mr-2'>{field.label}</span>
                  <span className='text-gray-800 text-right'>{displayValue}</span>
                </div>
              )
            })}
          </div>

          {/* Hiển thị các widget (nếu có) */}
          {widgets?.map((widget, idx) => (
            <div key={idx} className='mt-6 bg-gray-50 p-2 rounded-md'>
              <h3 className='font-semibold mb-2'>{widget.label}</h3>
              <p className='text-sm text-gray-700 whitespace-pre-line'>{widget.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
