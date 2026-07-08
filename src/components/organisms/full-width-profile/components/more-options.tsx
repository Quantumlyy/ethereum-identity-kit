import React from 'react'
import { Refresh } from '../../../icons'

interface MoreOptionsProps {
  refetchData?: () => void
  nameMenu?: React.ReactNode
}

const MoreOptions: React.FC<MoreOptionsProps> = ({ nameMenu, refetchData }) => {
  return (
    <div className="more-options">
      {refetchData && (
        <button onClick={refetchData} className="more-options-refresh-button">
          <Refresh height={18} width={18} />
        </button>
      )}
      {nameMenu}
    </div>
  )
}

export default MoreOptions
