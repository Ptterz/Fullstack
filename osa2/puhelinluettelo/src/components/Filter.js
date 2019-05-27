import React from 'react'

const Filter = ({ filter, updateFilter }) => (
    <div>
        Rajaa:
        <input
            value={filter}
            onChange={updateFilter}
        />
    </div>
)

export default Filter