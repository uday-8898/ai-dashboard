import { Card, Spin } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const Counts = ({ title, count }) => {
  const loading = useSelector(state => state.user.loading)

  return (
    <div className='flex gap-2 md:flex-col font-semibold text-lg'>
      <span>
        {loading ? (
          <div className='h-10'>
            <Spin />
          </div>
        ) : (
          count
        )}
      </span>
      <span>{title}</span>
    </div>
  )
}

const DashboardCard = () => {
  const conversation_count = useSelector(state => state.user.conversation_count)
  const database_count = useSelector(state => state.user.database_count)

  return (
    <div className='w-full p-4 md:p-8 xl:p-16 '>
      {' '}
      <Card
        title={<span className='font-bold text-xl'>My First Bot</span>}
        extra={<></>}
      >
        <div className='flex flex-col md:flex-row w-full items-start gap-2 justify-between'>
          <Counts title={'Conversations'} count={conversation_count} />
          <Counts title={'Databases'} count={database_count} />
          <Counts title={'Users'} count={'0'} />
        </div>
      </Card>
    </div>
  )
}

export default DashboardCard
