import DashboardLayout from "@/components/layout/dashboard-layout"
import PageTitle from "@/components/ui/page-title"
import FormKaryawan from "@/components/karyawan/form-karyawan"

export default function TambahKaryawanPage(){

  return(

    <DashboardLayout>

      <PageTitle title="Tambah Karyawan" />

      <FormKaryawan />

    </DashboardLayout>

  )

}