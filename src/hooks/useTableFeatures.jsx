import { useState, useMemo, useCallback } from "react";
import { format } from "date-fns";

export function useTableFeatures({
  initialData,
  filterConfig = [],
  dateFilterKey,
  monthFilterKey,
  yearFilterKey,
  defaultMonth = new Date().getMonth(),
  defaultYear = new Date().getFullYear(),
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState(
    filterConfig.reduce((acc, filter) => {
      acc[filter.name] = filter.defaultValue;
      return acc;
    }, {})
  );

  const filteredData = useMemo(() => {
    if (selectedMonth === null || selectedYear === null) return initialData;

    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;

    return initialData.filter((item) => {
      // Logika search
      const matchesSearch =
        filterConfig.length > 0 && filterConfig[0].keys
          ? filterConfig[0].keys.some((key) =>
              item[key]
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : true;

      // Logika filter dinamis
      const matchesFilters = filterConfig.every((filter) => {
        const filterValue = filters[filter.name];
        return (
          filterValue === filter.defaultValue ||
          item[filter.key] === filterValue
        );
      });

      //   Logika filter tanggal, bulan dan tahun
      const matchesDate =
        !dateFilterKey || item[dateFilterKey] === formattedDate;
      const matchesMonth =
        monthFilterKey === undefined ||
        new Date(item[monthFilterKey]).getMonth() === selectedMonth;
      const matchesYear =
        yearFilterKey === undefined ||
        new Date(item[yearFilterKey]).getFullYear() === selectedYear;

      return (
        matchesSearch &&
        matchesFilters &&
        matchesDate &&
        matchesMonth &&
        matchesYear
      );
    });
  }, [
    initialData,
    searchTerm,
    filters,
    selectedDate,
    selectedMonth,
    selectedYear,
    filterConfig,
    dateFilterKey,
    monthFilterKey,
    yearFilterKey,
  ]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (filterName) => (value) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: value,
      }));
      setCurrentPage(1);
    },
    []
  );

  const handleDateChange = useCallback((date) => {
    if (date) {
      setSelectedDate(date);
      setCurrentPage(1);
    }
  }, []);

  const handleMonthChange = useCallback((monthIndex) => {
    setSelectedMonth(monthIndex);
    setCurrentPage(1);
  }, []);

  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  }, []);

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    paginatedData,
    searchTerm,
    filters,
    selectedDate,
    selectedMonth,
    selectedYear,
    setCurrentPage,
    handleSearchChange,
    handleFilterChange,
    handleDateChange,
    handleMonthChange,
    handleYearChange,
  };
}
