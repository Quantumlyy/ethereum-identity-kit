import React from 'react'
import Refresh from '../../../../icons/ui/Refresh'
import './CardHeader.css'

interface CardHeaderProps {
  refetchData: () => void
  nameMenu?: React.ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = ({ refetchData, nameMenu }) => {
  return (
    <div className="header">
      <div />
      <div className="header-right">
        <div className="header-refresh" onClick={refetchData}>
          <Refresh height={16} width={16} />
        </div>
        {nameMenu}
      </div>
    </div>
  )
}

export default CardHeader
