<template>
  <div>
    <organization-chart :datasource="ds"></organization-chart>
  </div>
</template>

<script>
import OrganizationChart from 'vue3-organization-chart'
import 'vue3-organization-chart/dist/orgchart.css'
/**
 * CRUD component form
 */

export default {
  name: "RegulatorOrgchart" ,
  components: {
    OrganizationChart
  },
  setup(){  
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
  },
  data () {
    return {
      ds: {
        'id': '1',
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager' },
          { 'id': '3', 'name': 'Su Miao', 'title': 'department manager',
            'children': [
              { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
              { 'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                'children': [
                  { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                  { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                ]
                }
              ]
            },
          { 'id': '8', 'name': 'Hong Miao', 'title': 'department manager' },
          { 'id': '9', 'name': 'Chun Miao', 'title': 'department manager' }
        ]
      }
    }
  }
}

</script>

<style scoped>
</style>