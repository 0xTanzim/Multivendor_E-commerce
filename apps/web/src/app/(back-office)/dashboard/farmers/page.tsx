import React from 'react'
import PageHeader from '../_components/PageHeader'
import TableActions from '../_components/TableActions'

const farmersPage = () => {
  return (
    <div>
    {/* header  */}
    <PageHeader
      heading="Farmers"
      linkTitle="Add Farmer"
      href="/dashboard/farmers/new"
    />

    {/* table action */}
    <TableActions />

    <div className="py-8">
      <h2>Table</h2>
    </div>
  </div>
  )
}

export default farmersPage