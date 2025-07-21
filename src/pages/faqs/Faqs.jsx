import { useState } from "react";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { CaretDown, MagnifyingGlass, Question } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import { Input, InputIcon } from "keep-react";
import { Link } from "react-router-dom";
import { OptionsFaqsData } from "../../data/FaqsData";

export default function Faqs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  // Filter opsi berdasarkan searchTerm
  //   const filteredOptions = options.filter((option) =>
  //     option.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   const handleSearchChange = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
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
            <div className="flex flex-col gap-4">
              {OptionsFaqsData.map((option) => (
                <div key={option.id}>
                  {/* Header Accordion */}
                  <div
                    className={`flex justify-between items-center p-4 bg-white border border-gray-100 cursor-pointer ${
                      expandedSections[option.id]
                        ? "rounded-t-2xl"
                        : "rounded-2xl"
                    }`}
                    onClick={() => toggleSection(option.id)}
                  >
                    <span className="font-medium">{option.name}</span>
                    <div className="bg-[#F5F5F5] p-2 rounded-md">
                      <CaretDown
                        size={20}
                        weight="bold"
                        className={`transition-transform duration-300 ${
                          expandedSections[option.id] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {option.menu && expandedSections[option.id] && (
                    <div
                      className={`p-4 bg-white border border-t-0 rounded-2xl rounded-t-none border-gray-100 grid grid-cols-1 gap-4 ${
                        option.menu.length > 1
                          ? "md:grid-cols-2 2xl:grid-cols-3"
                          : ""
                      }`}
                    >
                      {option.menu.map((item) => (
                        <Link
                          to={`/faqs/category/${item.id}`}
                          key={item.id}
                          className="flex justify-between items-center p-4 bg-secondary rounded-2xl mb-4"
                        >
                          <h4 className="font-medium text-lg lg:text-xl xl:text-2xl">
                            {item.title}
                          </h4>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 md:w-20 2xl:w-28 h-auto"
                          />
                        </Link>
                      ))}
                    </div>
                  )}

                  {option.content && expandedSections[option.id] && (
                    <div
                      className={`p-4 bg-white border border-t-0 rounded-2xl rounded-t-none border-gray-100 flex flex-col`}
                    >
                      {option.content.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-4 bg-secondary rounded-2xl mb-4"
                        >
                          <h4 className="font-medium text-lg lg:text-xl xl:text-2xl">
                            {item.title}
                          </h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
