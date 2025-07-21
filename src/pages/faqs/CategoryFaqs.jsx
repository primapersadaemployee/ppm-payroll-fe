import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryFaqsData } from "../../data/FaqsData";
import { Button, Input, InputIcon } from "keep-react";
import { ArrowLeft, MagnifyingGlass, Question } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";

export default function CategoryFaqs() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const category = CategoryFaqsData.find((category) => category.id == id);
    setCategory(category);
  }, [id]);

  return (
    <>
      <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
        <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
          <SidebarComponent />
        </div>
        <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Breadcrumb Navigation */}
            <nav className="text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Question size={16} weight="fill" />
                <span>/</span>
                <span className="font-medium">FAQ</span>
                <span>/</span>
                <span>{category?.title}</span>
              </div>
            </nav>

            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl lg:text-3xl font-medium">
                Frequently Asked Questions
              </h1>
              <div className="w-[20%] sm:w-auto">
                <NotificationDashboard />
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full bg-white flex flex-col gap-8">
              <fieldset className="relative w-full">
                <Input
                  type="text"
                  placeholder="Apa pertanyaan anda?"
                  name="search"
                  // value={searchTerm}
                  // onChange={handleSearchChange}
                  className="flex-1 ps-11"
                />
                <InputIcon>
                  <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
                </InputIcon>
              </fieldset>
            </div>
            <div className="flex flex-col gap-8">
              <Link to="/faqs" className="flex items-center justify-end">
                <Button
                  variant="outline"
                  color="secondary"
                  className="flex gap-1 items-center"
                >
                  <ArrowLeft size={16} weight="bold" />
                  <span>Kembali</span>
                </Button>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category?.content.map((faq) => (
                  <div
                    key={faq.id}
                    className="flex flex-col gap-4 p-8 bg-white rounded-2xl border border-gray-100 shadow-xl"
                  >
                    <h3 className="font-medium text-lg lg:text-xl xl:text-2xl text-black">
                      {faq.title}
                    </h3>
                    <p className="text-sm lg:text-base">{faq.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
