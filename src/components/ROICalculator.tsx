import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    number_of_residents: 100,
    falls_per_year: 50,
    avg_cost_per_fall: 30000,
    staff_hourly_rate: 25,
    avg_minutes_saved_per_incident: 15,
    insurance_premium_per_year: 50000,
    legal_liability_cost_per_year: 25000,
    percent_falls_prevented: 0.40,
    initial_installation_cost: 75000,
    annual_subscription_cost: 15000
  });

  const [calculatedResults, setCalculatedResults] = useState<any>(null);
  const [fallsPerResidentRate, setFallsPerResidentRate] = useState(0.5);

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'number_of_residents') {
      const newResidents = Number(value) || 1;
      const newFallsPerYear = fallsPerResidentRate * newResidents;
      setFormData(prev => ({
        ...prev,
        number_of_residents: newResidents,
        falls_per_year: Math.round(newFallsPerYear)
      }));
    } else if (field === 'falls_per_year') {
      const newFallsPerYear = Number(value) || 0;
      const newRate = newFallsPerYear / formData.number_of_residents;
      setFallsPerResidentRate(newRate);
      setFormData(prev => ({
        ...prev,
        falls_per_year: newFallsPerYear
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateROI = () => {
    const {
      number_of_residents,
      falls_per_year,
      percent_falls_prevented,
      avg_cost_per_fall,
      avg_minutes_saved_per_incident,
      staff_hourly_rate,
      insurance_premium_per_year,
      legal_liability_cost_per_year,
      initial_installation_cost,
      annual_subscription_cost
    } = formData;

    const falls_per_resident = falls_per_year / number_of_residents;
    const falls_prevented = falls_per_year * percent_falls_prevented;
    const direct_medical_savings = falls_prevented * avg_cost_per_fall;
    const staff_time_saved_hours = (avg_minutes_saved_per_incident / 60) * falls_prevented;
    const staff_efficiency_gains = staff_time_saved_hours * staff_hourly_rate;
    const insurance_savings = insurance_premium_per_year * (falls_prevented / falls_per_year) * 0.05;
    const legal_savings = legal_liability_cost_per_year * (falls_prevented / falls_per_year);
    const total_annual_savings = direct_medical_savings + staff_efficiency_gains + insurance_savings + legal_savings;
    const payback_period_years = initial_installation_cost / total_annual_savings;
    const three_year_roi = ((total_annual_savings * 3) - (initial_installation_cost + annual_subscription_cost * 3)) / 
                           (initial_installation_cost + annual_subscription_cost * 3) * 100;
    const year_1_savings = total_annual_savings - initial_installation_cost - annual_subscription_cost;
    const year_2_savings = total_annual_savings - annual_subscription_cost;
    const year_3_savings = total_annual_savings - annual_subscription_cost;

    return {
      falls_per_resident,
      falls_prevented,
      direct_medical_savings,
      staff_efficiency_gains,
      insurance_savings,
      legal_savings,
      total_annual_savings,
      payback_period_years,
      three_year_roi,
      year_1_savings,
      year_2_savings,
      year_3_savings
    };
  };

  const defaultResults = calculateROI();
  const roi = calculatedResults || defaultResults;

  const handleCalculate = () => {
    const results = calculateROI();
    setCalculatedResults(results);
  };

  return (
    <div className="mt-16 p-8 bg-blue-50 rounded-2xl max-md:max-w-full max-md:mr-2.5 max-md:mt-10 max-md:px-5">
      {/* Header */}
      <div className="flex flex-col items-center text-center pb-8">
        <h3 className="text-gray-900 text-3xl font-bold leading-[1.2]">
          Professional ROI Calculator
        </h3>
        <p className="text-gray-600 text-base mt-4 max-w-2xl">
          Calculate comprehensive cost savings and operational improvements for your facility
        </p>
      </div>
      
      {/* Input Section: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-900 text-xl font-semibold mb-4">
              Facility Information
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Number of Residents
                </label>
                <input
                  type="number"
                  value={formData.number_of_residents}
                  onChange={(e) => handleInputChange('number_of_residents', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Falls per Year
                </label>
                <input
                  type="number"
                  value={formData.falls_per_year}
                  onChange={(e) => handleInputChange('falls_per_year', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Average Cost per Fall ($)
                </label>
                <input
                  type="number"
                  value={formData.avg_cost_per_fall}
                  onChange={(e) => handleInputChange('avg_cost_per_fall', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Staff Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={formData.staff_hourly_rate}
                  onChange={(e) => handleInputChange('staff_hourly_rate', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Average Minutes Saved per Incident
                </label>
                <input
                  type="number"
                  value={formData.avg_minutes_saved_per_incident}
                  onChange={(e) => handleInputChange('avg_minutes_saved_per_incident', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h4 className="text-gray-900 text-xl font-semibold mb-4">
              Cost & System Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Insurance Premium per Year ($)
                </label>
                <input
                  type="number"
                  value={formData.insurance_premium_per_year}
                  onChange={(e) => handleInputChange('insurance_premium_per_year', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Legal Liability Cost per Year ($)
                </label>
                <input
                  type="number"
                  value={formData.legal_liability_cost_per_year}
                  onChange={(e) => handleInputChange('legal_liability_cost_per_year', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Percent Falls Prevented (0-1)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={formData.percent_falls_prevented}
                  onChange={(e) => handleInputChange('percent_falls_prevented', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Initial Installation Cost ($)
                </label>
                <input
                  type="number"
                  value={formData.initial_installation_cost}
                  onChange={(e) => handleInputChange('initial_installation_cost', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Annual Subscription Cost ($)
                </label>
                <input
                  type="number"
                  value={formData.annual_subscription_cost}
                  onChange={(e) => handleInputChange('annual_subscription_cost', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-300 text-base text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calculate Button */}
      <div className="mb-8">
        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
        >
          <Calculator className="w-5 h-5" />
          Calculate Comprehensive ROI Analysis
        </button>
      </div>
      
      {/* Results Section - Desktop: 2x2 Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6">
        {/* Total Annual Savings Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6 flex flex-col justify-center text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            ${Math.round(roi.total_annual_savings).toLocaleString()}
          </div>
          <div className="text-base font-semibold text-green-800 mb-1">
            Total Annual Savings
          </div>
          <div className="text-sm text-green-600">
            Direct + indirect cost reduction
          </div>
        </div>
        
        {/* Cost Breakdown Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            Cost Breakdown
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Direct Medical Cost Savings:</span>
              <span className="font-medium text-blue-600">${Math.round(roi.direct_medical_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Staff Efficiency Gains:</span>
              <span className="font-medium text-purple-600">${Math.round(roi.staff_efficiency_gains).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Insurance Premium Reduction:</span>
              <span className="font-medium text-orange-600">${Math.round(roi.insurance_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Legal Liability Reduction:</span>
              <span className="font-medium text-red-600">${Math.round(roi.legal_savings).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* ROI Timeline Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            ROI Timeline
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Payback Period:</span>
              <span className="font-medium text-teal-600">{roi.payback_period_years.toFixed(2)} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Three Year ROI:</span>
              <span className="font-medium text-gray-900">{roi.three_year_roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        {/* Annual Cumulative Net Savings Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            Annual Cumulative Net Savings
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Year 1:</span>
              <span className="font-medium text-blue-600">${Math.round(roi.year_1_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Year 2:</span>
              <span className="font-medium text-purple-600">${Math.round(roi.year_2_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Year 3:</span>
              <span className="font-medium text-green-600">${Math.round(roi.year_3_savings).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile/Tablet Results - Stacked */}
      <div className="lg:hidden space-y-4">
        {/* Total Annual Savings Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            ${Math.round(roi.total_annual_savings).toLocaleString()}
          </div>
          <div className="text-base font-semibold text-green-800 mb-1">
            Total Annual Savings
          </div>
          <div className="text-sm text-green-600">
            Direct + indirect cost reduction
          </div>
        </div>
        
        {/* Cost Breakdown Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            Cost Breakdown
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Direct Medical Cost Savings:</span>
              <span className="font-medium text-blue-600">${Math.round(roi.direct_medical_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Staff Efficiency Gains:</span>
              <span className="font-medium text-purple-600">${Math.round(roi.staff_efficiency_gains).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Insurance Premium Reduction:</span>
              <span className="font-medium text-orange-600">${Math.round(roi.insurance_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Legal Liability Reduction:</span>
              <span className="font-medium text-red-600">${Math.round(roi.legal_savings).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* ROI Timeline Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            ROI Timeline
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Payback Period:</span>
              <span className="font-medium text-teal-600">{roi.payback_period_years.toFixed(2)} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Three Year ROI:</span>
              <span className="font-medium text-gray-900">{roi.three_year_roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        {/* Annual Cumulative Net Savings Card */}
        <div className="bg-white border-4 border-black rounded-lg p-6">
          <h5 className="text-base font-semibold text-gray-900 mb-4">
            Annual Cumulative Net Savings
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Year 1:</span>
              <span className="font-medium text-blue-600">${Math.round(roi.year_1_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Year 2:</span>
              <span className="font-medium text-purple-600">${Math.round(roi.year_2_savings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Year 3:</span>
              <span className="font-medium text-green-600">${Math.round(roi.year_3_savings).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
