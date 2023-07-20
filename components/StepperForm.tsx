"use client";
import React, { useState } from "react";
import MapDemo from "./MapDemo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";

const MyMap = dynamic(() => import("./MapDemo"), { ssr: false });

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const router = useRouter();

  const testForm = useFormik({
    initialValues: {
      name: "",
      contactno: 0,
      address: "",
      location: "",
    },
    onSubmit: (data) => {
      console.log(data);
      toast({
        title: "Form Submitted successfully",
        color: "#fe5",
      });
      router.push("/");
    },
  });

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="">
            <h2 className="font-sans mb-2">Step 1: Select your Location</h2>
            <div className="rounded-xl overflow-hidden">
              <MyMap loc={testForm.setFieldValue} />
            </div>
            <Button className="mt-7" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="font-sans">Step 2: Contact Information</h2>
            <div className="grid lg:grid-cols-2 gap-5 mb-5">
              <div>
                <Label className="mb-2" htmlFor="name">
                  Name
                </Label>
                <Input id="name" onChange={testForm.handleChange} name="name" />
              </div>
              <div>
                <Label className="mb-2" htmlFor="contactno">
                  Contact no
                </Label>
                <Input
                  id="contactno"
                  type="number"
                  onChange={testForm.handleChange}
                  name="contactno"
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="address">
                  Address
                </Label>
                <textarea
                  className="border rounded-md w-full h-32"
                  onChange={testForm.handleChange}
                  name="address"
                  id="address"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="font-sans mb-5 ">Step 3: Confirmation</h2>
            <p className="font-mono">
              Name:{" "}
              <span className="font-sans font-semibold">
                {testForm.values.name}
              </span>
            </p>
            <p className="font-mono">
              Contact no:{" "}
              <span className="font-sans font-semibold">
                {testForm.values.contactno}
              </span>
            </p>
            <p className="font-mono">
              Address:{" "}
              <span className="font-sans font-semibold">
                {testForm.values.address}
              </span>
            </p>
            <p className="font-mono">
              Location:{" "}
              <span className="font-sans font-semibold">
                {testForm.values.location}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button onClick={handlePrevStep}>Previous</Button>
              <Button variant={"outline"} type="submit">
                Submit
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 rounded-2xl">
        <form onSubmit={testForm.handleSubmit}>{renderFormStep()}</form>
      </div>
    </div>
  );
};

export default StepperForm;
