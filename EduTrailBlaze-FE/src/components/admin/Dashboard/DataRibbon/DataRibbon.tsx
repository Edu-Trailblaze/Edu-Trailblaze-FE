import { Grid } from '@mui/material'
import React from 'react'
import DataCard from '../DataCard/DataCard'
import scss from './DataRibbon.module.scss'

export default function DataRibbon() {
  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title='Total Sales'
          value='462'
          description='The total of all DataSoft products in the current financial year'
        />
      </Grid>
      <Grid>
        <DataCard title='Total Values' value='$25,732' description='The total sales of the current financial year' />
      </Grid>
      <Grid>
        <DataCard
          title='Avg. Order Value'
          value='$159.3'
          description='The average order for all sales this current financial year'
        />
      </Grid>
      <Grid>
        <DataCard title='Conversion rate' value='0.61%' description='How many pitches become sales' />
      </Grid>
    </Grid>
  )
}
