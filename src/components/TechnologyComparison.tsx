import React from 'react';
import { Check, X } from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

const comparisonData = [
  {
    technology: "Camera AI\n(SafelyYou)",
    capturesImages: { text: "Yes (deleted after non-fall events)", bg: "bg-red-50", icon: "x", color: "text-red-700" },
    bathroomSafe: { text: "No (privacy laws prohibit)", bg: "bg-red-50", icon: "x", color: "text-red-700" },
    wearableRequired: { text: "No", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    complianceIssue: { text: "N/A", bg: "bg-gray-50", icon: null, color: "text-gray-700" },
    installationComplexity: { text: "Moderate (camera mounting)", bg: "bg-orange-50", icon: null, color: "text-orange-700" }
  },
  {
    technology: "Wearable\nPendants",
    capturesImages: { text: "No", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    bathroomSafe: { text: "Yes", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    wearableRequired: { text: "Yes", bg: "bg-red-50", icon: "x", color: "text-red-700" },
    complianceIssue: { text: "High (50%+ non-compliance)", bg: "bg-red-50", icon: "x", color: "text-red-700" },
    installationComplexity: { text: "Low (distribution only)", bg: "bg-green-50", icon: null, color: "text-green-700" }
  },
  {
    technology: "Care Aware Radar",
    capturesImages: { text: "No (physics prevents it)", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    bathroomSafe: { text: "Yes", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    wearableRequired: { text: "No", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    complianceIssue: { text: "None", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    installationComplexity: { text: "Moderate (sensor install)", bg: "bg-orange-50", icon: null, color: "text-orange-700" }
  },
  {
    technology: "Care Aware WiFi",
    capturesImages: { text: "No (physics prevents it)", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    bathroomSafe: { text: "Yes", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    wearableRequired: { text: "No", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    complianceIssue: { text: "None", bg: "bg-green-50", icon: "check", color: "text-green-700" },
    installationComplexity: { text: "Low (software deployment)", bg: "bg-green-50", icon: null, color: "text-green-700" }
  }
];

const TechnologyComparison = () => {
  return (
    <section className="relative bg-gray-50 w-full py-16 lg:py-20 px-6 lg:px-8">
      <SectionTagBadge sectionTag="technology-comparison" adminPath="/admin/technology-comparison" enabled={true} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Technology Comparison Matrix
          </h2>
        </div>

        {/* Desktop & Tablet: Table Layout */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="w-full border-collapse" role="table" aria-label="Technology comparison matrix">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900 min-w-[140px]">
                  Technology
                </th>
                <th className="text-center p-4 font-semibold text-gray-900 min-w-[160px]">
                  Captures Images?
                </th>
                <th className="text-center p-4 font-semibold text-gray-900 min-w-[140px]">
                  Bathroom Safe?
                </th>
                <th className="text-center p-4 font-semibold text-gray-900 min-w-[140px]">
                  Wearable Required?
                </th>
                <th className="text-center p-4 font-semibold text-gray-900 min-w-[160px]">
                  User Compliance Issue?
                </th>
                <th className="text-center p-4 font-semibold text-gray-900 min-w-[180px]">
                  Installation Complexity
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={row.technology}
                  className="border-b border-gray-200"
                >
                  <td className="p-4 font-semibold text-gray-900 whitespace-pre-line">
                    {row.technology}
                  </td>
                  <td className={`p-4 text-center ${row.capturesImages.bg}`}>
                    <div className="flex items-center justify-center gap-2">
                      {row.capturesImages.icon === "check" && <Check className={`w-4 h-4 ${row.capturesImages.color}`} />}
                      {row.capturesImages.icon === "x" && <X className={`w-4 h-4 ${row.capturesImages.color}`} />}
                      <span className={`text-sm ${row.capturesImages.color}`}>{row.capturesImages.text}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-center ${row.bathroomSafe.bg}`}>
                    <div className="flex items-center justify-center gap-2">
                      {row.bathroomSafe.icon === "check" && <Check className={`w-4 h-4 ${row.bathroomSafe.color}`} />}
                      {row.bathroomSafe.icon === "x" && <X className={`w-4 h-4 ${row.bathroomSafe.color}`} />}
                      <span className={`text-sm ${row.bathroomSafe.color}`}>{row.bathroomSafe.text}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-center ${row.wearableRequired.bg}`}>
                    <div className="flex items-center justify-center gap-2">
                      {row.wearableRequired.icon === "check" && <Check className={`w-4 h-4 ${row.wearableRequired.color}`} />}
                      {row.wearableRequired.icon === "x" && <X className={`w-4 h-4 ${row.wearableRequired.color}`} />}
                      <span className={`text-sm ${row.wearableRequired.color}`}>{row.wearableRequired.text}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-center ${row.complianceIssue.bg}`}>
                    <div className="flex items-center justify-center gap-2">
                      {row.complianceIssue.icon === "check" && <Check className={`w-4 h-4 ${row.complianceIssue.color}`} />}
                      {row.complianceIssue.icon === "x" && <X className={`w-4 h-4 ${row.complianceIssue.color}`} />}
                      <span className={`text-sm ${row.complianceIssue.color}`}>{row.complianceIssue.text}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-center ${row.installationComplexity.bg}`}>
                    <span className={`text-sm ${row.installationComplexity.color}`}>{row.installationComplexity.text}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden space-y-4">
          {comparisonData.map((row) => (
            <div 
              key={row.technology}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              role="article"
              aria-label={`Comparison for ${row.technology}`}
            >
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-base whitespace-pre-line">
                  {row.technology}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-600">Captures Images?</div>
                  <div className={`p-2 rounded ${row.capturesImages.bg}`}>
                    <div className="flex items-center gap-2">
                      {row.capturesImages.icon === "check" && <Check className={`w-4 h-4 ${row.capturesImages.color}`} />}
                      {row.capturesImages.icon === "x" && <X className={`w-4 h-4 ${row.capturesImages.color}`} />}
                      <span className={`text-sm ${row.capturesImages.color}`}>{row.capturesImages.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-600">Bathroom Safe?</div>
                  <div className={`p-2 rounded ${row.bathroomSafe.bg}`}>
                    <div className="flex items-center gap-2">
                      {row.bathroomSafe.icon === "check" && <Check className={`w-4 h-4 ${row.bathroomSafe.color}`} />}
                      {row.bathroomSafe.icon === "x" && <X className={`w-4 h-4 ${row.bathroomSafe.color}`} />}
                      <span className={`text-sm ${row.bathroomSafe.color}`}>{row.bathroomSafe.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-600">Wearable Required?</div>
                  <div className={`p-2 rounded ${row.wearableRequired.bg}`}>
                    <div className="flex items-center gap-2">
                      {row.wearableRequired.icon === "check" && <Check className={`w-4 h-4 ${row.wearableRequired.color}`} />}
                      {row.wearableRequired.icon === "x" && <X className={`w-4 h-4 ${row.wearableRequired.color}`} />}
                      <span className={`text-sm ${row.wearableRequired.color}`}>{row.wearableRequired.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-600">User Compliance Issue?</div>
                  <div className={`p-2 rounded ${row.complianceIssue.bg}`}>
                    <div className="flex items-center gap-2">
                      {row.complianceIssue.icon === "check" && <Check className={`w-4 h-4 ${row.complianceIssue.color}`} />}
                      {row.complianceIssue.icon === "x" && <X className={`w-4 h-4 ${row.complianceIssue.color}`} />}
                      <span className={`text-sm ${row.complianceIssue.color}`}>{row.complianceIssue.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-600">Installation Complexity</div>
                  <div className={`p-2 rounded ${row.installationComplexity.bg}`}>
                    <span className={`text-sm ${row.installationComplexity.color}`}>{row.installationComplexity.text}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyComparison;
