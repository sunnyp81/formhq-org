import { useState } from 'react';

interface Props {
  businessName?: string;
  stateName?: string;
}

export default function LeadCaptureForm({ businessName, stateName }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-6 bg-accent-50 border border-accent-200 rounded-lg text-center">
        <p className="text-lg font-semibold text-accent-700">Thanks! We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
      <h3 className="text-lg font-bold">Get a Free Insurance Quote</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="lead-name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="lead-email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
        </div>
        <div>
          <label htmlFor="lead-business-type" className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
          <input type="text" id="lead-business-type" name="businessType" value={businessName ?? ''} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-100" />
        </div>
        <div>
          <label htmlFor="lead-state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input type="text" id="lead-state" name="state" value={stateName ?? ''} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-100" />
        </div>
      </div>
      <button type="submit" className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
        Get My Quote
      </button>
    </form>
  );
}
