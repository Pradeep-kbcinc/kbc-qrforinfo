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
    companyName: { type: String, default: 'KBC India' },
    websiteUrl: { type: String, default: 'www.website.com' },
    effectiveDate: { type: String, default: '' },
    lastUpdated: { type: String, default: '' },
    grievanceOfficerName: { type: String, default: '[Full Name]' },
    supportEmail: { type: String, default: 'support@company.com' },
    address: { type: String, default: '[Full Company Address]' },
    phone: { type: String, default: '[Phone Number]' },
    workingHours: { type: String, default: 'Monday–Friday, 10 AM – 6 PM IST' }
  })
  

  const sections = ref([
  {
    id: 'overview',
    title: 'Overview',
    html: `
      <p>
        At Knowledge Bridge Consulting India (“KBC India”, “Company”, “we”, “us”, or “our”), 
        we value your privacy and are committed to protecting your personal information.
      </p>

      <p>
        This Privacy Policy (“Policy”) explains how we collect, use, store, disclose, and 
        safeguard your information when you access or use our website, mobile applications, 
        assessments, counseling platforms, educational services, digital wellness solutions, 
        and related services (collectively referred to as the “Platform” or “Services”).
      </p>

      <p>
        By accessing or using our Platform, you agree to the terms outlined in this Policy. 
        If you do not agree with this Policy, please refrain from using our Services or 
        sharing your personal information with us.
      </p>
    `
  },

  {
    id: 'personal-data',
    title: '1. Personal Data We Collect',
    html: `
      <strong>A. Information You Provide Directly</strong>

      <p class="mt-2"><strong>Account & Registration Information</strong></p>

      <p>We may collect personal details such as:</p>

      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Password and login credentials</li>
        <li>Organization or institution details</li>
        <li>Profile photograph</li>
      </ul>

      <br>

      <strong>B. Information Collected Automatically</strong>

      <p class="mt-2"><strong>Location Information</strong></p>

      <p>
        With your permission, we may collect approximate or precise location information 
        to improve service delivery, attendance systems, or location-based recommendations.
      </p>

      <p class="mt-4"><strong>Cookies & Tracking Technologies</strong></p>

      <p>We use cookies, analytics tools, and similar tracking technologies to:</p>

      <ul>
        <li>Enhance user experience</li>
        <li>Improve platform functionality</li>
        <li>Analyze user behavior and engagement</li>
        <li>Maintain security and session management</li>
      </ul>

      <br>

      <strong>C. Information from Third Parties</strong>

      <p class="mt-2">We may receive information from:</p>

      <ul>
        <li>Schools, institutions, NGOs, or partner organizations</li>
        <li>Payment gateways and financial institutions</li>
        <li>Government departments or authorized agencies</li>
        <li>Public databases or records</li>
        <li>
          Social media platforms when users log in through third-party accounts 
          such as Google or Facebook
        </li>
      </ul>
    `
  },

  {
    id: 'use',
    title: '2. How We Use Your Personal Data',
    html: `
      <p>
        We use your personal information to operate and improve the QRForInfo 
        real estate marketplace, in the following ways:
      </p>

      <ul>
        <li>Create and manage user accounts for buyers, sellers, tenants, and agents.</li>
        <li>Enable property listing, browsing, buying, selling, and renting activities.</li>
        <li>Facilitate direct communication between users through chat, calls, and inquiries.</li>
        <li>Provide personalized property recommendations based on user preferences and behavior.</li>
        <li>Improve search results, platform performance, and overall user experience.</li>
        <li>Allow property owners and agents to manage and update their listings efficiently.</li>
        <li>Send alerts, notifications, and updates related to properties and platform activity.</li>
        <li>Detect and prevent fraud, spam, and unauthorized access to ensure platform safety.</li>
        <li>Offer customer support and resolve user queries or disputes.</li>
        <li>Comply with applicable legal, regulatory, and real estate requirements.</li>
        <li>Enforce platform policies, terms of use, and maintain marketplace integrity.</li>
      </ul>
    `
  },

  {
    id: 'share',
    title: '3. Who We Share Your Personal Data With',
    html: `
      <p><strong>Authorized Institutions & Organizations</strong></p>

      <p>
        Schools, educational boards, NGOs, government departments, counselors, therapists, 
        or institutions associated with the services being provided.
      </p>

      <p class="mt-4"><strong>Service Providers</strong></p>

      <p>Third-party vendors assisting with:</p>

      <ul>
        <li>Cloud hosting</li>
        <li>Technical support</li>
        <li>Data analytics</li>
        <li>Payment processing</li>
        <li>Communication services</li>
      </ul>

      <p class="mt-4"><strong>Business Affiliates & Partners</strong></p>

      <p>
        Organizations providing complementary educational, counseling, healthcare, 
        or wellness services.
      </p>

      <p class="mt-4"><strong>Legal & Regulatory Authorities</strong></p>

      <p>
        Government agencies, courts, or law enforcement authorities where disclosure 
        is required under applicable laws or legal processes.
      </p>

      <p class="mt-4"><strong>Corporate Transactions</strong></p>

      <p>
        In the event of a merger, acquisition, restructuring, or transfer of business assets, 
        user information may be transferred as part of the business transaction.
      </p>

      <p>
        All third parties receiving personal data are required to maintain confidentiality 
        and process information only for authorized purposes.
      </p>
    `
  },

  {
    id: 'storage',
    title: '4. Data Storage and Retention',
    html: `
      <p>
        Your information may be stored on secure servers located in India and other 
        jurisdictions that maintain adequate data protection standards.
      </p>

      <p>
        We retain personal information only for as long as necessary to:
      </p>

      <ul>
        <li>Provide our services</li>
        <li>Meet contractual and legal obligations</li>
        <li>Resolve disputes</li>
        <li>Maintain security and compliance requirements</li>
      </ul>

      <p>
        After the applicable retention period, data is securely deleted, anonymized, 
        or archived in accordance with applicable laws.
      </p>
    `
  },

  {
    id: 'rights',
    title: '5. Your Rights',
    html: `
      <p>Subject to applicable laws, you may have the right to:</p>

      <ul>
        <li>Access your personal information</li>
        <li>Correct or update inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent for certain processing activities</li>
        <li>Request data portability where technically feasible</li>
        <li>Object to or restrict processing under certain circumstances</li>
        <li>File complaints or grievances regarding misuse of personal data</li>
      </ul>

      <p>
        To exercise these rights, you may contact our Grievance Officer 
        using the details provided below.
      </p>
    `
  },

  {
    id: 'protection',
    title: '6. Data Protection Practices',
    html: `
      <p>
        We implement industry-standard security measures, including:
      </p>

      <ul>
        <li>SSL encryption and secure communication protocols</li>
        <li>Role-based access controls</li>
        <li>Multi-factor authentication for sensitive systems</li>
        <li>Regular security monitoring and audits</li>
        <li>Employee confidentiality and data protection training</li>
        <li>Secure backup and disaster recovery mechanisms</li>
      </ul>

      <p>
        While we strive to protect all information, no electronic transmission 
        or storage system can guarantee complete security.
      </p>

      <p>
        Users are encouraged to use strong passwords and safeguard account credentials.
      </p>
    `
  },

  {
    id: 'thirdparty',
    title: '7. Third-Party Websites, Applications, and Services',
    html: `
      <p>
        Our Platform may contain links to external websites, applications, 
        or services operated by third parties.
      </p>

      <p>
        Knowledge Bridge Consulting India is not responsible for the privacy practices, 
        content, or security of such external platforms.
      </p>

      <p>
        Users are encouraged to review the privacy policies of third-party services 
        before sharing personal information.
      </p>
    `
  },

  {
    id: 'children',
    title: '8. Children’s Privacy',
    html: `
      <p>
        Our services intended for minors are accessed only under the supervision 
        or authorization of parents, guardians, schools, or authorized institutions.
      </p>

      <p>
        We do not knowingly collect personal information from children without 
        appropriate consent or lawful authority.
      </p>

      <p>
        If we become aware of unauthorized collection of a child’s information, 
        we will take immediate steps to delete such data.
      </p>
    `
  },

  {
    id: 'changes',
    title: '9. Changes to this Privacy Policy',
    html: `
      <p>
        We may revise or update this Privacy Policy periodically to reflect changes 
        in legal, regulatory, operational, or technological requirements.
      </p>

      <p>
        Updated versions will be published on our Platform with the revised 
        “Last Updated” date.
      </p>

      <p>
        Continued use of our Services after such updates constitutes acceptance 
        of the revised Policy.
      </p>
    `
  },

  {
    id: 'contact',
    title: '10. Contact Us – Grievance Officer',
    html: `
      <p>
        For questions, concerns, or complaints regarding this Privacy Policy 
        or our data handling practices, please contact:
      </p>

      <p>
        <strong>Grievance Officer:</strong> ${props.grievanceOfficerName}<br>
        <strong>Designation:</strong> Data Protection Officer<br>
        <strong>Organization:</strong> Knowledge Bridge Consulting India<br>
        <strong>Email:</strong>
        <a href="mailto:${props.supportEmail}">
          ${props.supportEmail}
        </a><br>
        <strong>Address:</strong> ${props.address}<br>
        <strong>Contact Number:</strong> ${props.phone}<br>
        <strong>Working Hours:</strong> ${props.workingHours}
      </p>

      <p class="mt-4">
        This Privacy Policy is designed in compliance with applicable Indian laws, including:
      </p>

      <ul>
        <li>Information Technology Act, 2000</li>
        <li>
          Information Technology (Reasonable Security Practices and Procedures and 
          Sensitive Personal Data or Information) Rules, 2011
        </li>
        <li>Digital Personal Data Protection Act, 2023 (India)</li>
      </ul>
    `
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
  