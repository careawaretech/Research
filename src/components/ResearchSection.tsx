import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citation_count: number;
  badges: string[];
  tags: string[];
  pdf_url: string | null;
  citation_text: string | null;
  featured: boolean;
}

const ResearchSection = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [loading, setLoading] = useState(true);

  const topics = ['All Topics', ...Array.from(new Set(publications.flatMap(p => p.tags)))];
  const years = ['All Years', ...Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a)];

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [publications, selectedTopic, selectedYear]);

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false })
        .order('citation_count', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPublications(data || []);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...publications];

    if (selectedTopic !== 'All Topics') {
      filtered = filtered.filter(pub => pub.tags.includes(selectedTopic));
    }

    if (selectedYear !== 'All Years') {
      filtered = filtered.filter(pub => pub.year.toString() === selectedYear);
    }

    setFilteredPublications(filtered);
  };

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citation_count, 0);
  const hIndex = calculateHIndex(publications.map(p => p.citation_count));

  function calculateHIndex(citations: number[]): number {
    const sorted = citations.sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] >= i + 1) {
        h = i + 1;
      } else {
        break;
      }
    }
    return h;
  }

  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-gray-900 text-4xl leading-none self-center max-md:max-w-full">
              Research Credibility & Publications
            </h2>
            <p className="text-gray-600 text-xl leading-7 mt-[30px] max-md:max-w-full">
              Founded by PhD researchers with institutional backing and peer-reviewed scientific contributions
            </p>
          </div>
        </div>
        
        <div className="bg-[rgba(0,0,0,0)] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch w-full max-md:max-w-full max-md:mt-10">
                <h3 className="text-gray-900 text-3xl font-normal leading-[1.2]">
                  Founding Team
                </h3>
                
                <div className="flex w-full flex-col items-stretch justify-center mt-[39px] px-[17px] py-[30px] rounded-2xl max-md:max-w-full max-md:pr-5">
                  <div className="bg-[rgba(0,0,0,0)] pl-[15px] py-[3px] max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                      <div className="w-[19%] max-md:w-full max-md:ml-0">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/d5c694891d028347edc2aaf4a6b46ed27ce92657?placeholderIfAbsent=true"
                          alt="Dr. Sarah Chen"
                          className="aspect-[1] object-contain w-24 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] shrink-0 rounded-full max-md:mt-[15px]"
                        />
                      </div>
                      <div className="w-[81%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(0,0,0,0)] w-full mx-auto max-md:mt-[15px]">
                          <div className="flex flex-col text-base pl-3.5">
                            <h4 className="text-gray-900 text-2xl font-bold leading-none">
                              Dr. Sarah Chen
                            </h4>
                            <div className="text-blue-600 font-semibold mt-[22px]">
                              Co-Founder & CEO
                            </div>
                            <div className="bg-[rgba(0,0,0,0)] self-stretch flex flex-col text-gray-700 font-normal mt-7 pr-7 pb-[9px] max-md:pr-5">
                              <div className="self-stretch">
                                • Dual Master's degrees in Electrical Engineering
                              </div>
                              <div className="mt-[17px]">
                                • PhD Candidate, Portland State University
                              </div>
                              <div className="leading-6 mt-[17px]">
                                • Research focus: SFCW radar systems, signal processing
                              </div>
                              <div className="leading-6 mt-4">
                                • 15+ peer-reviewed publications in healthcare sensing
                              </div>
                            </div>
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 font-normal mt-4 px-3.5 py-px">
                            <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap text-center justify-center w-12 h-8">
                              <div>PSU</div>
                            </div>
                            <div className="text-gray-600 text-sm leading-none grow shrink w-[303px] basis-auto my-auto">
                              Portland State University
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex w-full flex-col items-stretch justify-center mt-8 px-[17px] py-[30px] rounded-2xl max-md:max-w-full max-md:pr-5">
                  <div className="bg-[rgba(0,0,0,0)] pl-[15px] py-[3px] max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                      <div className="w-[19%] max-md:w-full max-md:ml-0">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/ad3b83bc1cc32ef7f36157923e709bc603e66682?placeholderIfAbsent=true"
                          alt="Dr. Michael Rodriguez"
                          className="aspect-[1] object-contain w-24 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] shrink-0 rounded-full max-md:mt-[22px]"
                        />
                      </div>
                      <div className="w-[81%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="bg-[rgba(0,0,0,0)] w-full mx-auto max-md:mt-[22px]">
                          <div className="flex flex-col text-base pl-[7px]">
                            <h4 className="text-gray-900 text-2xl font-bold leading-none">
                              Dr. Michael Rodriguez
                            </h4>
                            <div className="text-green-600 font-semibold mt-4">
                              Co-Founder & CTO
                            </div>
                            <div className="bg-[rgba(0,0,0,0)] self-stretch flex flex-col text-gray-700 font-normal mt-7 pr-2.5 pb-[9px]">
                              <div>• PhD in Electrical Engineering</div>
                              <div className="mt-[17px]">
                                • RF Engineer, Intel Corporation (2020–present)
                              </div>
                              <div className="self-stretch mt-[15px]">
                                • Expertise: Wireless communications, IoT systems
                              </div>
                              <div className="mt-[17px]">
                                • 20+ patents in RF hardware design
                              </div>
                            </div>
                          </div>
                          <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 font-normal mt-4 px-[7px] py-px">
                            <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap text-center justify-center w-12 h-8">
                              <div>INTEL</div>
                            </div>
                            <div className="text-gray-600 text-sm leading-none grow shrink w-[313px] basis-auto my-auto">
                              Intel Corporation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(0,0,0,0)] flex grow flex-col items-stretch w-full pb-[140px] max-md:max-w-full max-md:mt-10 max-md:pb-[100px]">
                <h3 className="text-gray-900 text-3xl font-normal leading-[1.2]">
                  Academic Partnerships
                </h3>
                
                <div className="bg-[rgba(0,0,0,0)] w-full mt-8 grid grid-cols-2 gap-4 max-md:gap-3">
                  {/* Card 1: PSU */}
                  <div className="bg-white border border-gray-200 text-center p-6 rounded-xl border-solid border-2 max-md:p-4">
                    <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 mb-4">
                      <div>PSU LOGO</div>
                    </div>
                    <h4 className="text-base text-gray-900 font-semibold mb-2 max-md:text-sm">
                      Portland State University
                    </h4>
                    <p className="text-sm text-gray-600 font-normal max-md:text-xs">
                      Radar research collaboration
                    </p>
                  </div>
                  
                  {/* Card 2: Intel */}
                  <div className="bg-white border border-gray-200 text-center p-6 rounded-xl border-solid border-2 max-md:p-4">
                    <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 mb-4">
                      <div>INTEL LOGO</div>
                    </div>
                    <h4 className="text-base text-gray-900 font-semibold mb-2 max-md:text-sm">
                      Intel Corporation
                    </h4>
                    <p className="text-sm text-gray-600 font-normal max-md:text-xs">
                      RF engineering expertise
                    </p>
                  </div>
                  
                  {/* Card 3: NIH */}
                  <div className="bg-white border border-gray-200 text-center p-6 rounded-xl border-solid border-2 max-md:p-4">
                    <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 mb-4">
                      <div>NIH LOGO</div>
                    </div>
                    <h4 className="text-base text-gray-900 font-semibold mb-2 max-md:text-sm">
                      National Institutes of Health
                    </h4>
                    <p className="text-sm text-gray-600 font-normal max-md:text-xs">
                      SBIR/STTR funding track
                    </p>
                  </div>
                  
                  {/* Card 4: NIA */}
                  <div className="bg-white border border-gray-200 text-center p-6 rounded-xl border-solid border-2 max-md:p-4">
                    <div className="bg-[rgba(240,240,240,1)] flex flex-col items-center text-xs text-[rgba(153,153,153,1)] whitespace-nowrap justify-center h-16 mb-4">
                      <div>NIA LOGO</div>
                    </div>
                    <h4 className="text-base text-gray-900 font-semibold mb-2 max-md:text-sm">
                      National Institute on Aging
                    </h4>
                    <p className="text-sm text-gray-600 font-normal max-md:text-xs">
                      Fall prevention research focus
                    </p>
                  </div>
                </div>
                
                <div className="bg-purple-50 w-full mt-8 p-6 rounded-xl max-md:max-w-full max-md:px-5">
                  <h4 className="bg-[rgba(0,0,0,0)] flex flex-col text-base text-purple-900 font-semibold pb-[13px] max-md:max-w-full max-md:pr-5">
                    <div className="z-10">Research Metrics</div>
                  </h4>
                  <div className="flex items-center justify-around gap-8 mt-4">
                    <div className="text-center">
                      <div className="text-3xl text-purple-600 font-bold">{publications.length}</div>
                      <div className="text-sm text-purple-800 mt-1">Total Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-purple-600 font-bold">{totalCitations}</div>
                      <div className="text-sm text-purple-800 mt-1">Total Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-purple-600 font-bold">{hIndex}</div>
                      <div className="text-sm text-purple-800 mt-1">h-index</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(0,0,0,0)] w-full mt-16 max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] flex w-full items-stretch gap-5 font-normal flex-wrap justify-between max-md:max-w-full">
            <h3 className="text-gray-900 text-3xl leading-[1.2]">
              Recent Publications
            </h3>
            <div className="bg-[rgba(0,0,0,0)] flex items-stretch gap-4 text-base text-black">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-white border-gray-300 border flex items-stretch gap-[40px_71px] px-2.5 py-2 rounded-lg border-solid"
              >
                {topics.map(topic => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border-gray-300 border flex items-stretch gap-[40px_71px] px-2.5 py-2 rounded-lg border-solid"
              >
                {years.map(year => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <div className="bg-gray-200 rounded-lg p-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(0,0,0,0)] w-full mt-8 max-md:max-w-full">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading publications...</p>
              </div>
            ) : filteredPublications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No publications found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPublications.map((pub) => (
                  <article key={pub.id} className="bg-white border border-gray-200 w-full px-[25px] py-[23px] rounded-xl max-md:px-5">
                    <div className="text-sm font-normal leading-none">
                      <div className="flex flex-col pb-1.5">
                        <h4 className="text-gray-900 text-base font-semibold leading-6">
                          {pub.title}
                        </h4>
                        <div className="text-gray-600 mt-5">
                          {pub.authors.join(', ')}
                        </div>
                        <div className="text-blue-600 mt-3.5">
                          {pub.journal}, {pub.year}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-stretch gap-5 flex-wrap justify-between mt-4">
                      <div className="flex items-stretch gap-[13px] flex-wrap">
                        <div className="text-gray-500 text-sm font-normal leading-none">
                          Cited by: {pub.citation_count}
                        </div>
                        {pub.badges.map((badge) => (
                          <span 
                            key={badge}
                            className="bg-blue-100 text-xs text-blue-800 font-medium text-center px-[15px] py-[3px] rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-stretch gap-2 text-sm font-medium text-center">
                        {pub.pdf_url && (
                          <a 
                            href={pub.pdf_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            PDF
                          </a>
                        )}
                        {pub.citation_text && (
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(pub.citation_text || '');
                              alert('Citation copied to clipboard!');
                            }}
                            className="text-gray-600 hover:underline"
                          >
                            Cite
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Research Collaboration Opportunities */}
        <div className="mt-16 max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-8 px-20 max-md:max-w-full max-md:px-5">
            <h3 className="text-gray-900 text-3xl leading-[1.2]">
              Research Collaboration Opportunities
            </h3>
            <p className="text-gray-600 text-base mt-4 max-w-2xl">
              Partner with us on cutting-edge research in privacy-preserving senior care technology
            </p>
          </div>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap max-md:max-w-full">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Latest Papers
            </button>
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Collaborate with Our Team
            </button>
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Join Advisory Board
            </button>
          </div>
        </div>
        
        {/* Partnership Opportunities */}
        <div className="mt-16 max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(0,0,0,0)] flex flex-col items-center font-normal text-center pb-8 px-20 max-md:max-w-full max-md:px-5">
            <h3 className="text-gray-900 text-3xl leading-[1.2]">
              Partnership Opportunities
            </h3>
          </div>
          
          <div className="mt-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {/* Left Panel: For Assisted Living Facilities */}
              <div className="w-6/12 max-md:w-full max-md:ml-0">
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col max-md:mt-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">🏢</span>
                  </div>
                  
                  <h4 className="text-gray-900 text-2xl font-bold mb-2">
                    For Assisted Living Facilities
                  </h4>
                  <p className="text-gray-600 text-sm mb-6">
                    Partner with us to pioneer the future of senior safety technology
                  </p>
                  
                  {/* Pilot Partnership Benefits */}
                  <h5 className="text-gray-900 text-base font-semibold mb-4">
                    Pilot Partnership Benefits
                  </h5>
                  <div className="space-y-3 mb-6">
                    <div className="bg-blue-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-blue-600 text-sm">🎁</span>
                      <span className="text-gray-700 text-sm">Free equipment provided during pilot period</span>
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-green-600 text-sm">⚙️</span>
                      <span className="text-gray-700 text-sm">Professional installation and staff training</span>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-purple-600 text-sm">🛠️</span>
                      <span className="text-gray-700 text-sm">Dedicated technical support</span>
                    </div>
                    <div className="bg-orange-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-orange-600 text-sm">📄</span>
                      <span className="text-gray-700 text-sm">Co-publication opportunities</span>
                    </div>
                    <div className="bg-red-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-red-600 text-sm">💰</span>
                      <span className="text-gray-700 text-sm">Early adopter pricing guarantee</span>
                    </div>
                  </div>
                  
                  {/* Implementation Timeline */}
                  <h5 className="text-gray-900 text-base font-semibold mb-4">
                    Implementation Timeline
                  </h5>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">Apply</p>
                        <p className="text-gray-600 text-xs">Submit partnership application (1 week)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">Qualification Call</p>
                        <p className="text-gray-600 text-xs">Assess facility fit, discuss logistics (1 week)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">MOU Signing</p>
                        <p className="text-gray-600 text-xs">Memorandum of understanding (2 weeks)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                        4
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">Installation & Go Live</p>
                        <p className="text-gray-600 text-xs">Site survey, installation, training (3 weeks)</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* What Facilities Provide */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="text-gray-900 text-sm font-semibold mb-3">
                      What Facilities Provide
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Access for installation (2–5 units/rooms)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Staff participation in training sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Resident participation (with consent)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Incident reporting (falls, false alarms)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Optional participation in case study publication</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right Panel: NIH SBIR/STTR Grant Status */}
              <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col max-md:mt-6">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">📊</span>
                  </div>
                  
                  <h4 className="text-gray-900 text-2xl font-bold mb-2">
                    NIH SBIR/STTR Grant Status
                  </h4>
                  <p className="text-gray-600 text-sm mb-6">
                    Supporting cutting-edge research in elderly care technology
                  </p>
                  
                  {/* Current Funding Stage */}
                  <h5 className="text-gray-900 text-base font-semibold mb-4">
                    Current Funding Stage
                  </h5>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 text-sm">📝</span>
                        <span className="text-gray-700 text-sm">Phase I SBIR Application</span>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                        Under Review
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600 text-sm">🏛️</span>
                      <span className="text-gray-700 text-sm">National Institute on Aging (NIA)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 text-sm">🎯</span>
                      <span className="text-gray-700 text-sm">Focus: Fall prevention for Alzheimer's/dementia populations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 text-sm">💵</span>
                      <span className="text-gray-700 text-sm">Anticipated funding: Up to $500K Phase I</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 text-sm">📅</span>
                      <span className="text-gray-700 text-sm">Decision expected: Q1 2026</span>
                    </div>
                  </div>
                  
                  {/* Grant Progress Tracker */}
                  <h5 className="text-gray-900 text-base font-semibold mb-4">
                    Grant Progress Tracker
                  </h5>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-sm">✓</span>
                        <span className="text-gray-700 text-sm">Phase I Application Submitted</span>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-sm">⏳</span>
                        <span className="text-gray-700 text-sm">NIH Review Process</span>
                      </div>
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                        In Progress
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-sm">🔬</span>
                        <span className="text-gray-700 text-sm">Phase II Clinical Validation</span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Planned
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">🚀</span>
                        <span className="text-gray-500 text-sm">Commercialization</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                        Future
                      </span>
                    </div>
                  </div>
                  
                  {/* Research Collaboration */}
                  <h5 className="text-gray-900 text-base font-semibold mb-4">
                    Research Collaboration
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-purple-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-purple-600 text-sm">👥</span>
                      <span className="text-gray-700 text-sm">Co-investigator roles for academic partners</span>
                    </div>
                    <div className="bg-blue-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-blue-600 text-sm">📊</span>
                      <span className="text-gray-700 text-sm">Data sharing agreements</span>
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-green-600 text-sm">📝</span>
                      <span className="text-gray-700 text-sm">Co-publication on pilot study results</span>
                    </div>
                    <div className="bg-orange-50 px-3 py-2 rounded flex items-start gap-2">
                      <span className="text-orange-600 text-sm">🎓</span>
                      <span className="text-gray-700 text-sm">Advisory board participation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
