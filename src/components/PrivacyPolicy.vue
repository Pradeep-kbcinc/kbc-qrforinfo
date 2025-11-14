<template>
    <v-container fluid>
        <v-row align="center" justify="space-between" class="mb-4">
          <v-col cols="12" md="8">
            <h1 class="text-h5 font-weight-bold mb-1">Privacy Policy</h1>
            <div class="text-subtitle-2">Effective Date: {{ effectiveDate }} | Last Updated: {{ lastUpdated }}</div>
          </v-col>
          <!-- <v-col cols="12" md="4" class="text-md-right">
            <v-btn variant="text" size="sm" @click="downloadPDF">Download PDF</v-btn>
          </v-col> -->
        </v-row>
  
        <v-divider class="mb-4" />
  
        <v-row>
          <v-col cols="12" md="3">
            <v-list nav>
              <v-list-item v-for="(s, i) in sections" :key="i" clickable @click="scrollTo(s.id)">
                <v-list-item-title>{{ s.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
  
          <v-col cols="12" md="9">
            <section :id="section.id" v-for="section in sections" :key="section.id" class="mb-6">
              <h2 class="text-h6 font-weight-medium mb-2">{{ section.title }}</h2>
              <div v-html="section.html" class="policy-body"></div>
            </section>
  
            <v-divider class="my-4" />
  
            <div class="text-caption">If you have questions about this Policy, contact our Grievance Officer below.</div>
  
            <v-card class="mt-3 pa-4 rounded-lg"  outlined>
              <div><strong>Grievance Officer:</strong> {{ grievanceOfficerName }}</div>
              <div><strong>Designation:</strong> Data Protection Officer</div>
              <div><strong>Email:</strong> <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a></div>
              <div v-if="address"><strong>Address:</strong> {{ address }}</div>
              <div v-if="phone"><strong>Contact Number:</strong> {{ phone }}</div>
              <div v-if="workingHours"><strong>Working Hours:</strong> {{ workingHours }}</div>
            </v-card>
          </v-col>
        </v-row>
      
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'

  
  // Props for easy customization
  const props = defineProps({
    companyName: { type: String, default: '[Company Name]' },
    websiteUrl: { type: String, default: 'www.website.com' },
    effectiveDate: { type: String, default: '[Insert Date]' },
    lastUpdated: { type: String, default: '[Insert Date]' },
    grievanceOfficerName: { type: String, default: '[Full Name]' },
    supportEmail: { type: String, default: 'support@company.com' },
    address: { type: String, default: '[Full Company Address]' },
    phone: { type: String, default: '[Phone Number]' },
    workingHours: { type: String, default: 'Monday–Friday, 10 AM – 6 PM IST' }
  })
  
  // Build the sections from the provided privacy policy text (HTML-safe)
  const sections = ref([
    {
      id: 'overview',
      title: 'Overview',
      html: `We, at ${props.companyName}, including our affiliates and subsidiaries worldwide ("Company", "we", "us", or "our"), respect your privacy and are committed to protecting your personal information. This Privacy Policy ("Policy") explains how we collect, use, disclose, and safeguard your information when you access or use our property buying and selling platform, including our website ${props.websiteUrl}, mobile application, and other online services (collectively referred to as the "Platform").<br><br>By using our Platform, you agree to the terms of this Policy. If you do not agree, please do not use the Platform or provide us with your personal information.`
    },
    {
      id: 'personal-data',
      title: '1. Personal Data We Collect',
      html: `<strong>A. Information You Provide Directly</strong><ul><li><strong>Account Information:</strong> Name, email address, phone number, password, and profile photo.</li><li><strong>Property Details:</strong> Property address, type, price, ownership documents, images, videos, amenities, and location.</li><li><strong>Identity Verification:</strong> Government-issued ID proof (PAN, Aadhaar, Passport), address proof, or business registration for brokers/dealers.</li><li><strong>Transaction Data:</strong> Payment details (excluding full credit/debit card numbers), invoices, transaction history, and subscription details.</li><li><strong>Communication Data:</strong> Emails, chat messages, reviews, or inquiries shared via our Platform.</li></ul><strong>B. Information Collected Automatically</strong><ul><li><strong>Device and Usage Data:</strong> IP address, device ID, browser type, operating system, access time, referring URLs, and app version.</li><li><strong>Location Data:</strong> Approximate or precise location when enabled, for showing nearby listings or personalized search results.</li><li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to improve Platform performance and user experience.</li></ul><strong>C. Information from Third Parties</strong><ul><li>We may receive data from payment gateways or financial institutions for verifying transactions.</li><li>Real estate agents, builders, or partners who list properties.</li><li>Publicly available records (e.g., property registration databases).</li><li>Social media platforms, if you sign in using Google, Facebook, or similar accounts.</li></ul>`
    },
    {
      id: 'use',
      title: '2. How We Use Your Personal Data',
      html: `<ul><li>Enable core services — property search, listing, buying, selling, and renting.</li><li>Create and manage your account, verify your identity, and prevent fraud.</li><li>Facilitate communication between buyers, sellers, brokers, and agents.</li><li>Send notifications about listings, offers, transactions, or account activity.</li><li>Improve our services by analyzing trends and user behavior.</li><li>Provide customer support and respond to your requests or complaints.</li><li>Comply with legal obligations, regulatory requirements, or enforce our Terms of Use.</li><li>Personalize user experience, including targeted advertisements or property recommendations.</li></ul>`
    },
    {
      id: 'share',
      title: '3. Who We Share Your Personal Data With',
      html: `<ul><li>Property owners, buyers, tenants, and brokers when you express interest in a listing or post a property.</li><li>Service providers who assist in hosting, analytics, customer support, marketing, and payments.</li><li>Business partners or affiliates offering related services (e.g., home loans, movers, interior design).</li><li>Regulatory or law enforcement agencies, if required by applicable law or legal process.</li><li>Successors or assignees in case of merger, acquisition, or restructuring of our business.</li></ul><p>All third parties are contractually obligated to maintain confidentiality and use your data only for authorized purposes.</p>`
    },
    {
      id: 'storage',
      title: '4. Data Storage and Retention',
      html: `<p>Your data is stored on secure servers located in India and/or other jurisdictions with adequate protection.</p><p>We retain your personal data only as long as necessary to provide our services, comply with legal obligations, or resolve disputes. Once the retention period ends, data is securely deleted or anonymized.</p>`
    },
    {
      id: 'rights',
      title: '5. Your Rights',
      html: `<p>Subject to applicable laws, you have the following rights:</p><ul><li><strong>Access:</strong> Request a copy of your personal data.</li><li><strong>Correction:</strong> Update or rectify inaccurate or incomplete information.</li><li><strong>Deletion:</strong> Request deletion of your data where processing is no longer necessary.</li><li><strong>Withdrawal of Consent:</strong> Withdraw previously given consent without affecting prior processing.</li><li><strong>Data Portability:</strong> Request transfer of your data to another platform (if technically feasible).</li><li><strong>Grievance Redressal:</strong> File a complaint regarding misuse or unauthorized access.</li></ul><p>You can exercise these rights by contacting our Grievance Officer (details below).</p>`
    },
    {
      id: 'protection',
      title: '6. Data Protection Practices',
      html: `<p>We use industry-standard measures to protect your data, including:</p><ul><li>SSL encryption for data transmission.</li><li>Multi-factor authentication for sensitive transactions.</li><li>Access control and audit mechanisms for internal handling of data.</li><li>Regular security audits and employee confidentiality training.</li></ul><p>However, please note that no digital platform can guarantee absolute security. Users are encouraged to maintain strong passwords and avoid sharing login credentials.</p>`
    },
    {
      id: 'thirdparty',
      title: '7. Third-Party Websites, Apps, and Services',
      html: `<p>Our Platform may contain links to third-party websites or apps (e.g., banks, payment gateways, insurance providers). We are not responsible for the privacy practices or content of such external sites. We encourage you to review their privacy policies before sharing any data.</p>`
    },
    {
      id: 'children',
      title: '8. Children\'s Privacy',
      html: `<p>Our Platform is not intended for individuals under the age of 18. We do not knowingly collect or process data from minors. If we become aware that a child has provided us with personal data, we will delete it promptly.</p>`
    },
    {
      id: 'changes',
      title: '9. Changes to this Privacy Policy',
      html: `<p>We may update this Policy periodically to reflect changes in our practices or legal requirements. The revised version will be posted on the Platform with an updated “Last Updated” date. Continued use of our Platform after such updates constitutes your consent to the revised Policy.</p>`
    },
    {
      id: 'contact',
      title: '10. How to Contact Us – Grievance Officer',
      html: `<p>For any concerns, queries, or complaints regarding this Policy or data processing, you may contact:<br><strong>Grievance Officer:</strong> ${props.grievanceOfficerName}<br><strong>Email:</strong> <a href=\"mailto:${props.supportEmail}\">${props.supportEmail}</a><br><strong>Address:</strong> ${props.address}<br><strong>Contact Number:</strong> ${props.phone}<br><strong>Working Hours:</strong> ${props.workingHours}</p><p>✅ This Privacy Policy is compliant with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (India).</p>`
    }
  ])
  
  // Methods
  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  function downloadPDF() {
    // lightweight approach: open print dialog - user can save as PDF
    window.print()
  }
  </script>
  
  <style scoped>
  /* .policy-body p { margin-bottom: 0.75rem; line-height: 1.5; }
  .policy-body ul { margin-left: 30px!important; margin-bottom: 0.75rem; } */
  ul{
    margin-left: 30px!important;
  }
  </style>
  