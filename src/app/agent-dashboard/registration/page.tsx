"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Upload,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Camera,
} from "lucide-react";

export default function AgentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    businessType: "",
    gstinNumber: "",
    panNumber: "",
    registrationNumber: "",

    // Contact Information
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    alternateContactName: "",
    alternateContactEmail: "",
    alternateContactPhone: "",

    // Address Information
    businessAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",

    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",

    // Documents
    gstinCertificate: null,
    panCard: null,
    incorporationCertificate: null,
    logo: null,

    // Terms
    agreeToTerms: false,
    agreeToCommission: false,
  });

  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Company Details", icon: Building2 },
    { id: 2, title: "Contact & Address", icon: FileText },
    { id: 3, title: "Bank Details", icon: CreditCard },
    { id: 4, title: "Documents & Review", icon: Upload },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting registration:", formData);
    alert(
      "Registration submitted successfully! We will review your application within 2-3 business days.",
    );
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.companyName && formData.gstinNumber && formData.panNumber
        );
      case 2:
        return (
          formData.primaryContactName &&
          formData.primaryContactEmail &&
          formData.primaryContactPhone &&
          formData.businessAddress
        );
      case 3:
        return formData.bankName && formData.accountNumber && formData.ifscCode;
      case 4:
        return formData.agreeToTerms && formData.agreeToCommission;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 sm:py-8 overflow-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agent Registration</h1>
        <p className="text-gray-600">
          Complete your registration to start listing packages on Roam Southeast
        </p>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Registration Progress</span>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progressPercent} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-100 text-green-600"
                        : isCurrent
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center ${
                      isCurrent ? "text-blue-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const currentStepData = steps.find((s) => s.id === currentStep);
              if (currentStepData?.icon) {
                const Icon = currentStepData.icon;
                return <Icon className="h-5 w-5" />;
              }
              return null;
            })()}
            <span>{steps.find((s) => s.id === currentStep)?.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Company Details */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="Enter your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  placeholder="e.g., Travel Agency, Tour Operator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstinNumber">GSTIN Number *</Label>
                <Input
                  id="gstinNumber"
                  value={formData.gstinNumber}
                  onChange={(e) =>
                    handleInputChange("gstinNumber", e.target.value)
                  }
                  placeholder="Enter 15-digit GSTIN"
                  maxLength={15}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) =>
                    handleInputChange("panNumber", e.target.value)
                  }
                  placeholder="Enter 10-digit PAN"
                  maxLength={10}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="registrationNumber">
                  Business Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    handleInputChange("registrationNumber", e.target.value)
                  }
                  placeholder="Company incorporation/registration number"
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Primary Contact */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Primary Contact Person
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactName">Full Name *</Label>
                    <Input
                      id="primaryContactName"
                      value={formData.primaryContactName}
                      onChange={(e) =>
                        handleInputChange("primaryContactName", e.target.value)
                      }
                      placeholder="Primary contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactEmail">Email *</Label>
                    <Input
                      id="primaryContactEmail"
                      type="email"
                      value={formData.primaryContactEmail}
                      onChange={(e) =>
                        handleInputChange("primaryContactEmail", e.target.value)
                      }
                      placeholder="primary@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactPhone">Phone *</Label>
                    <Input
                      id="primaryContactPhone"
                      value={formData.primaryContactPhone}
                      onChange={(e) =>
                        handleInputChange("primaryContactPhone", e.target.value)
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Alternate Contact */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Alternate Contact (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alternateContactName">Full Name</Label>
                    <Input
                      id="alternateContactName"
                      value={formData.alternateContactName}
                      onChange={(e) =>
                        handleInputChange(
                          "alternateContactName",
                          e.target.value,
                        )
                      }
                      placeholder="Alternate contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternateContactEmail">Email</Label>
                    <Input
                      id="alternateContactEmail"
                      type="email"
                      value={formData.alternateContactEmail}
                      onChange={(e) =>
                        handleInputChange(
                          "alternateContactEmail",
                          e.target.value,
                        )
                      }
                      placeholder="alternate@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternateContactPhone">Phone</Label>
                    <Input
                      id="alternateContactPhone"
                      value={formData.alternateContactPhone}
                      onChange={(e) =>
                        handleInputChange(
                          "alternateContactPhone",
                          e.target.value,
                        )
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div>
                <h3 className="text-lg font-medium mb-4">Business Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Street Address *</Label>
                    <Textarea
                      id="businessAddress"
                      value={formData.businessAddress}
                      onChange={(e) =>
                        handleInputChange("businessAddress", e.target.value)
                      }
                      placeholder="Enter complete business address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        placeholder="Pincode"
                        maxLength={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Bank Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Bank Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) =>
                        handleInputChange("bankName", e.target.value)
                      }
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountHolderName">
                      Account Holder Name *
                    </Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={(e) =>
                        handleInputChange("accountHolderName", e.target.value)
                      }
                      placeholder="As per bank records"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code *</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) =>
                        handleInputChange("ifscCode", e.target.value)
                      }
                      placeholder="Enter IFSC code"
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="upiId">UPI ID (Optional)</Label>
                    <Input
                      id="upiId"
                      value={formData.upiId}
                      onChange={(e) =>
                        handleInputChange("upiId", e.target.value)
                      }
                      placeholder="yourname@bankname"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Payment Information
                </h4>
                <p className="text-sm text-blue-800">
                  Payouts will be processed to this bank account after
                  successful trip completion and customer satisfaction
                  confirmation. We typically process payouts within 7-14
                  business days after trip completion.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Documents & Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Document Uploads */}
              <div>
                <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>GSTIN Certificate *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload GSTIN certificate
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Card *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload PAN card
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Registration Certificate</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload certificate
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload logo
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Terms and Conditions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked)
                      }
                    />
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm leading-relaxed"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and
                      <a
                        href="#"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        Privacy Policy
                      </a>{" "}
                      of Roam Southeast.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToCommission"
                      checked={formData.agreeToCommission}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToCommission", checked)
                      }
                    />
                    <Label
                      htmlFor="agreeToCommission"
                      className="text-sm leading-relaxed"
                    >
                      I understand and agree to the commission structure: 15%
                      platform fee on successful bookings, with payments
                      processed after trip completion and customer satisfaction
                      confirmation.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} disabled={!validateCurrentStep()}>
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!validateCurrentStep()}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Registration
          </Button>
        )}
      </div>
    </div>
  );
}
