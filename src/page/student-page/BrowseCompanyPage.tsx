import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import CompanyCard from "../component/CompanyCard";
import "aos/dist/aos.css";
import AOS from "aos";
import axios from "axios";
import { CompanyCardProps } from "../props/CompanyCardProps";
import { env } from "node:process";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxCustom } from "../component/CheckboxCustom";
import Spinner from "../component/Spinner";
import { useToast } from "@/components/hooks/use-toast";

function BrowseCompanyPage() {
  const [companies, setCompanies] = useState<CompanyCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function getAllCompany() {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "company/getAll"
        );
        setCompanies(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }
    AOS.init({ duration: 500 });
    getAllCompany();
  }, []);
  return (
    <Layout>
      <div className="mx-[8vw] mb-10 mt-6">
        <div className="flex flex-col items-center" data-aos="fade-up">
          <div className="text-center font-semibold text-[24px]">
            200+ Tech Company Around The World
          </div>
          <div className="mt-4">
            Explore opportunities with over 200 leading tech companies across
            the globe. From startups to established giants, these organizations
            are at the forefront of innovation. Find your next career move in a
            company that matches your ambitions.
          </div>
        </div>

        <div className="flex mt-10 w-full relative">
          <div
            className="w-1/4 bg-[#F0F0F0] h-full rounded-sm p-4 sticky top-[15%]"
            data-aos="fade-up"
          >
            <div className="font-bold">Filters</div>

            <Input className="my-2" placeholder="Search Company" />

            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="apple">Computer Science</SelectItem>
                    <SelectItem value="banana">
                      Mobile Application Development
                    </SelectItem>
                    <SelectItem value="blueberry">Data Science</SelectItem>
                    <SelectItem value="grapes">Cyber Security</SelectItem>
                    <SelectItem value="pineapple">
                      Game Application Development
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="font-bold mt-10">Filter Strong Position</div>

            <div>
              <CheckboxCustom text={"Front End Developer"} />
              <CheckboxCustom text={"Back End Developer"} />
              <CheckboxCustom text={"AI Engineer"} />
              <CheckboxCustom text={"Mobile Developer"} />
              <CheckboxCustom text={"Cyber Security"} />
              <CheckboxCustom text={"Data Analyst"} />
              <CheckboxCustom text={"Web Developer"} />
              <CheckboxCustom text={"Game Developer"} />
            </div>
          </div>

          <div className="w-3/4 ml-10" data-aos="fade-left">
            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-10">
                {companies.map((company: CompanyCardProps, idx: number) => {
                  console.log(company);
                  return (
                    <CompanyCard
                      id={company.id}
                      name={company.name}
                      logoUrl={company.logoUrl}
                      location={company.location}
                      VacancyCount={10}
                      description={company.description}
                      key={idx}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BrowseCompanyPage;
