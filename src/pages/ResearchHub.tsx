import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ResearchHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Research Hub</h1>
          <p className="text-lg text-muted-foreground">
            Content coming soon...
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchHub;
