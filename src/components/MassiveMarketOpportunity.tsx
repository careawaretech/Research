const MassiveMarketOpportunity = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-12 text-white mb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4">Massive Market Opportunity</h3>
        <p className="text-xl opacity-90">
          The global fall detection market represents a multi-billion dollar opportunity with strong growth trajectory
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <div className="text-5xl font-bold mb-2 text-yellow-300">$417.2M</div>
          <div className="text-lg font-semibold mb-2">2024 Market Size</div>
          <div className="text-sm opacity-80">Current global fall detection market value</div>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <div className="text-5xl font-bold mb-2 text-yellow-300">$1.04B</div>
          <div className="text-lg font-semibold mb-2">2033 Projection</div>
          <div className="text-sm opacity-80">Projected market value in 9 years</div>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <div className="text-5xl font-bold mb-2 text-yellow-300">10.7%</div>
          <div className="text-lg font-semibold mb-2">Annual Growth</div>
          <div className="text-sm opacity-80">Compound annual growth rate (CAGR)</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <h4 className="text-2xl font-bold mb-6">US Market Demographics</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">54M</div>
              <div className="text-sm opacity-80">Million Seniors (65+)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">30K</div>
              <div className="text-sm opacity-80">Assisted Living Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">95M</div>
              <div className="text-sm opacity-80">Million Baby Boomers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">$374B</div>
              <div className="text-sm opacity-80">Annual Healthcare Spending</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
          <h4 className="text-2xl font-bold mb-6">Investment Opportunity</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Addressable Market Size</span>
              <span className="font-bold text-yellow-300">$2.1B+</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Target Market Penetration</span>
              <span className="font-bold text-yellow-300">5-10%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Projected Revenue (5 years)</span>
              <span className="font-bold text-yellow-300">$105M+</span>
            </div>
            <div className="bg-white/20 p-4 rounded-lg mt-6 border border-white/30">
              <div className="text-center">
                <div className="text-sm opacity-80 mb-1">Conservative Market Share</div>
                <div className="text-2xl font-bold text-yellow-300">2.5%</div>
                <div className="text-sm opacity-80">= $26M Annual Revenue Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassiveMarketOpportunity;