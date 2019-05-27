import React from 'react'

const Filter = ({ name, values, onChange }) => (
    <div>
        find countries
        <input 
            name={name}
            values={values}
            onChange={onChange}
        />
    </div>
)

export default Filter