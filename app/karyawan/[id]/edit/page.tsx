import DashboardLayout from "@/components/layout/dashboard-layout"
import PageTitle from "@/components/ui/page-title"
import FormKaryawan from "@/components/karyawan/form-karyawan"

export default function EditKaryawanPage(){

  return(

    <DashboardLayout>

      <PageTitle title="Edit Karyawan" />

      <FormKaryawan initialData={{}} />

    </DashboardLayout>

  )

}