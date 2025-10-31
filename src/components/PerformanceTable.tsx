import React from 'react';
import { CheckCircle, Clock, X } from 'lucide-react';

const PerformanceTable = () => {
  return (
    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border border overflow-hidden text-center mt-16 p-px rounded-2xl border-solid max-md:max-w-full max-md:mt-10">
      <div className="flex flex-col items-center text-2xl text-white font-bold leading-none pt-4 pb-[25px] px-[70px] max-md:max-w-full max-md:px-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
        <h3>Clinical Performance Comparison</h3>
      </div>
      
      <div className="overflow-hidden text-base max-md:max-w-full">
        <table className="w-full">
          <thead className="bg-gray-50 font-semibold">
            <tr>
              <th className="text-gray-900 pt-3 pb-[25px] px-[70px] max-md:px-5">Clinical Metric</th>
              <th className="text-blue-900 pt-3 pb-[25px] px-[70px] max-md:px-5">SFCW Radar</th>
              <th className="text-green-900 pt-3 pb-[22px] px-[70px] max-md:px-5">WiFi Analysis</th>
              <th className="text-gray-700 pt-3 pb-[22px] px-[70px] max-md:px-5">Industry Standard</th>
            </tr>
          </thead>
          <tbody className="font-normal">
            <tr>
              <td className="text-gray-900 font-medium pt-3 pb-[23px] px-[70px] max-md:px-5">Fall Detection Sensitivity</td>
              <td className="text-blue-600 font-bold pt-3 pb-[26px] px-[70px] max-md:px-5">98.9%</td>
              <td className="text-green-600 pt-3 pb-[26px] px-[70px] max-md:px-5">Under Validation</td>
              <td className="text-gray-600 pt-3 pb-[26px] px-[70px] max-md:px-5">85-92%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="text-gray-900 font-medium pt-3 pb-[26px] px-[70px] max-md:px-5">False Alarm Rate</td>
              <td className="text-blue-600 font-bold pt-3 pb-[26px] px-[70px] max-md:px-5">1.0%</td>
              <td className="text-green-600 pt-3 pb-[23px] px-[70px] max-md:px-5">Testing Phase</td>
              <td className="text-gray-600 pt-3 pb-[26px] px-[70px] max-md:px-5">8-15%</td>
            </tr>
            <tr>
              <td className="text-gray-900 font-medium pt-3 pb-[23px] px-[70px] max-md:px-5">Bathroom Deployment</td>
              <td className="pt-3 pb-[26px] px-[70px] max-md:px-5">
                <span className="bg-green-100 flex w-20 items-stretch gap-2 px-2 py-1 rounded-full text-green-800 text-xs font-medium">
                  <CheckCircle className="w-3 h-3 mt-1" />
                  Validated
                </span>
              </td>
              <td className="pt-3 pb-[26px] px-[70px] max-md:px-5">
                <span className="bg-blue-100 flex w-[69px] gap-2.5 px-2 py-1 rounded-full text-blue-800 text-xs font-medium">
                  <Clock className="w-2.5 h-2.5 mt-1" />
                  Testing
                </span>
              </td>
              <td className="pt-3 pb-[26px] px-[70px] max-md:px-5">
                <span className="bg-red-100 flex w-[87px] items-stretch gap-2.5 px-2 py-1 rounded-full text-red-800 text-xs font-medium">
                  <X className="w-3 h-3 mt-1" />
                  Prohibited
                </span>
              </td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td className="text-gray-900 font-medium pt-3 pb-[22px] px-[70px] max-md:px-5">Privacy Compliance</td>
              <td className="text-blue-600 pt-3 pb-[21px] px-[70px] max-md:px-5">Physics-Based</td>
              <td className="text-green-600 pt-3 pb-[21px] px-[70px] max-md:px-5">Physics-Based</td>
              <td className="text-gray-600 font-normal pt-3 pb-[22px] px-[70px] max-md:px-5">Policy-Dependent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;
