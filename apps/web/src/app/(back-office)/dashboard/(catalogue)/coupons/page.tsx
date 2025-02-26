import React from 'react'
import PageHeader from '../../_components/PageHeader'
import TableActions from '../../_components/TableActions'

const couponsPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Coupons"
        linkTitle="Add Coupon"
        href="/dashboard/coupons/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  )
}

export default couponsPage