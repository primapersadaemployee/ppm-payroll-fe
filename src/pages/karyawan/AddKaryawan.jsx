import { Users, CaretRight } from "phosphor-react";
import { Button } from "keep-react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarComponent } from "../../components/layout/Sidebar";
import NotificationHome from "../../components/ui/notification/NotificationHome";
import StepsIndicator from "../../components/ui/steps/StepsIndicator";
import PersonalStep from "../../components/ui/steps/PersonalStep";
import KepegawaianStep from "../../components/ui/steps/KepegawaianStep";
import PayrollStep from "../../components/ui/steps/PayrollStep";
import { useAddKaryawanStore } from "../../store/AddKaryawanStore";

export default function AddKaryawan() {
  const { currentStep, handleNext, handleBack, handleSubmit } =
    useAddKaryawanStore();

  const router = useNavigate();

  const getCurrentStepName = () => {
    switch (currentStep) {
      case 1:
        return "Personal";
      case 2:
        return "Kepegawaian";
      case 3:
        return "Payroll";
      default:
        return "Personal";
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalStep />;
      case 2:
        return <KepegawaianStep />;
      case 3:
        return <PayrollStep />;
      default:
        return <PersonalStep />;
    }
  };

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Karyawan</span>
              <span>/</span>
              <span className="font-medium">Tambah Karyawan</span>
              <span>/</span>
              <span className="text-gray-400">{getCurrentStepName()}</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Karyawan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationHome />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
            {/* Steps Indicator */}
            <StepsIndicator />

            <form
              onSubmit={(e) => handleSubmit(e, router)}
              name="add-karyawan"
              id="add-karyawan"
              className="mt-8"
            >
              <div>
                {/* Render Current Step */}
                {renderCurrentStep()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    onClick={handleBack}
                  >
                    Kembali
                  </Button>
                ) : (
                  <Link to="/karyawan">
                    <Button variant="outline" color="secondary">
                      Batalkan
                    </Button>
                  </Link>
                )}
                <div className="flex gap-2">
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-primary hover:bg-primary/90 px-6"
                    >
                      Selanjutnya
                      <CaretRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={(e) => handleSubmit(e, router)}
                      className="bg-primary hover:bg-primary/90 px-6"
                    >
                      Selanjutnya
                      <CaretRight size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
