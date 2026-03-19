import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Database, 
  Share2, 
  Cookie, 
  Lock, 
  UserCheck, 
  Clock, 
  Globe, 
  Users, 
  FileText, 
  Mail,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  BookOpen,
  Link2,
  Link2Icon
} from 'lucide-react';

interface PrivacySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string[];
  subsections?: { title: string; items: string[] }[];
}

export function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1']));
  const [activeSection, setActiveSection] = useState<string>('1');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections: PrivacySection[] = [
    {
      id: '1',
      title: 'Overview',
      icon: <Shield className="w-5 h-5" />,
      content: [
        'This Privacy Policy explains how the platform collects, uses, and protects user data.',
        'By using the service, users agree to the data practices described here.'
      ]
    },
    {
      id: '2',
      title: 'Information We Collect',
      icon: <Database className="w-5 h-5" />,
      content: [
        'Your privacy is important to us. We collect different types of information to provide and improve our services.'
      ],
      subsections: [
        {
          title: 'a) Information you provide',
          items: [
            'Name, email, phone number',
            'Account/login details',
            'Any data you submit while using the service',
            'In some cases: financial or usage-related inputs (for service functionality)'
          ]
        },
        {
          title: 'b) Automatically collected data',
          items: [
            'IP address',
            'Device info (browser, OS, device type)',
            'Cookies & tracking data',
            'Usage behavior (pages visited, time spent, clicks)'
          ]
        },
        {
          title: 'c) Third-party data',
          items: [
            'Data from login providers (Google, etc.)',
            'Data from external integrations or services'
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'How Data is Used',
      icon: <Share2 className="w-5 h-5" />,
      content: [
        'Your data is used to:',
        '• Provide and operate services',
        '• Manage your account',
        '• Improve features and performance',
        '• Personalize user experience',
        '• Detect fraud, abuse, or security issues',
        '• Comply with legal obligations'
      ]
    },
    {
      id: '4',
      title: 'Data Sharing',
      icon: <Share2 className="w-5 h-5" />,
      content: [
        'Your data may be shared with:',
        '• Service providers (Hosting, analytics, email services) – Only for operational purposes',
        '• Legal authorities – If required by law',
        '• Business transfers – In case of merger/acquisition',
        '• Aggregated data – Non-identifiable data may be shared publicly'
      ],
      subsections: [
        {
          title: 'Important',
          items: [
            'Personal data is not sold without consent'
          ]
        }
      ]
    },
    {
      id: '5',
      title: 'Cookies & Tracking',
      icon: <Cookie className="w-5 h-5" />,
      content: [
        'Used for login, analytics, personalization',
        'You can disable cookies in browser settings',
        'Some features may break if disabled'
      ]
    },
    {
      id: '6',
      title: 'Data Security',
      icon: <Lock className="w-5 h-5" />,
      content: [
        'Uses industry-standard security measures',
        'Protects against unauthorized access',
        'No system is 100% secure (important reality)'
      ]
    },
    {
      id: '7',
      title: 'User Rights',
      icon: <UserCheck className="w-5 h-5" />,
      content: [
        'Users can:',
        '• Access their data',
        '• Update or correct data',
        '• Request deletion',
        '• Withdraw consent',
        '',
        'Requests can be made via support/contact email'
      ]
    },
    {
      id: '8',
      title: 'Data Retention',
      icon: <Clock className="w-5 h-5" />,
      content: [
        'Data is stored only as long as needed',
        'Some data may be kept for legal reasons',
        'Deleted or anonymized when no longer required'
      ]
    },
    {
      id: '9',
      title: 'International Data Transfer',
      icon: <Globe className="w-5 h-5" />,
      content: [
        'Data may be processed in different countries',
        'Proper safeguards are applied for protection'
      ]
    },
    {
      id: '10',
      title: "Children's Privacy",
      icon: <Users className="w-5 h-5" />,
      content: [
        'Not intended for users under 13',
        'Data of children is removed if discovered'
      ]
    },
    {
      id: '11',
      title: 'Third-Party Links',
      icon: <Link2Icon className="w-5 h-5" />,
      content: [
        'External websites are not controlled by the platform',
        'Their privacy policies apply separately'
      ]
    },
    {
      id: '12',
      title: 'Updates to Policy',
      icon: <FileText className="w-5 h-5" />,
      content: [
        'Policy may change over time',
        'Continued use = acceptance of updates'
      ]
    },
    {
      id: '13',
      title: 'Contact',
      icon: <Mail className="w-5 h-5" />,
      content: [
        'For any privacy-related queries:',
        'Contact via official support email'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
 

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-primary-100 text-lg mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-primary-50 text-lg">
            We are committed to protecting your privacy and ensuring you understand how we handle your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3 px-2">
                <BookOpen className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-gray-900">Contents</h3>
              </div>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-gray-400 text-xs">{section.id}.</span>
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Our Commitment to Privacy</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At The Helios AI, we take your privacy seriously. This policy describes how we collect, 
                use, and protect your personal information when you use our platform. By using our 
                services, you trust us with your information, and we're committed to maintaining that 
                trust.
              </p>
            </div>

            {/* Sections */}
            {sections.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden scroll-mt-20"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      <span className="text-primary-600 mr-2">{section.id}.</span>
                      {section.title}
                    </h3>
                  </div>
                  {expandedSections.has(section.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Section Content */}
                {expandedSections.has(section.id) && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      {section.content.map((paragraph, idx) => (
                        <p key={idx} className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}

                      {section.subsections?.map((subsection, idx) => (
                        <div key={idx} className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            {subsection.title}
                          </h4>
                          <ul className="space-y-2">
                            {subsection.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Questions About Your Privacy?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions or concerns about how we handle your data, 
                    please don't hesitate to reach out to our privacy team.
                  </p>
                  <a 
                    href="mailto:contact@theheliosai.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    contact@theheliosai.com
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center text-sm text-gray-500 pt-4">
              <p>© {new Date().getFullYear()} The Helios AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;