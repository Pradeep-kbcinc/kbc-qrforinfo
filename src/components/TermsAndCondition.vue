<template>
    <v-container fluid>
      <v-row align="center" justify="space-between" class="mb-4">
        <v-col cols="12" md="8">
          <h1 class="text-h5 font-weight-bold mb-1">Terms & Conditions</h1>
          <div class="text-subtitle-2">
            Effective Date: {{ effectiveDate }} | Last Updated: {{ lastUpdated }}
          </div>
        </v-col>
      </v-row>
  
      <v-divider class="mb-4" />
  
      <v-row>
        <!-- Left Navigation -->
        <v-col cols="12" md="3">
          <v-list nav>
            <v-list-item
              v-for="(s, i) in sections"
              :key="i"
              clickable
              @click="scrollTo(s.id)"
            >
              <v-list-item-title>{{ s.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
  
        <!-- Right Content -->
        <v-col cols="12" md="9">
          <section
            v-for="section in sections"
            :id="section.id"
            :key="section.id"
            class="mb-6"
          >
            <h2 class="text-h6 font-weight-medium mb-2">{{ section.title }}</h2>
            <div v-html="section.html" class="policy-body"></div>
          </section>
  
          <v-divider class="my-4" />
  
          <div class="text-subtitle-2">
            If you have any concerns regarding these Terms, contact our Grievance Officer below.
          </div>
  
          <v-card elevation="4" class="mt-3 pa-4 rounded-lg box-shadow">
            <div><strong>Grievance Officer:</strong> {{ grievanceOfficerName }}</div>
            <div><strong>Designation:</strong> Compliance Officer</div>
            <div>
              <strong>Email:</strong>
              <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
            </div>
            <div v-if="address"><strong>Address:</strong> {{ address }}</div>
            <div v-if="phone"><strong>Contact Number:</strong> {{ phone }}</div>
            <div v-if="workingHours"><strong>Working Hours:</strong> {{ workingHours }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const effectiveDate = ref("January 1, 2025");
  const lastUpdated = ref("January 1, 2025");
  
  const grievanceOfficerName = ref("John Doe");
  const supportEmail = ref("support@example.com");
  const phone = ref("+91 9876543210");
  const address = ref("123 Corporate Park, Bangalore, India");
  const workingHours = ref("Mon–Fri, 10:00 AM – 6:00 PM");
  
  const sections = ref([
    {
      id: "introduction",
      title: "1. Introduction",
      html: `
        <p>Welcome to our platform. These Terms & Conditions (“Terms”) govern your use of our services, website, and mobile application.</p>
        <p>By accessing or using our platform, you agree to be bound by these Terms.</p>
      `,
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      html: `
        <p>You must be at least 18 years old to use our services. By using our platform, you confirm that you meet this requirement.</p>
      `,
    },
    {
      id: "user-responsibilities",
      title: "3. User Responsibilities",
      html: `
        <ul>
          <li>You agree to provide accurate information.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You must not misuse the platform or engage in prohibited activities.</li>
        </ul>
      `,
    },
    {
      id: "prohibited-activities",
      title: "4. Prohibited Activities",
      html: `
        <p>Users are strictly prohibited from:</p>
        <ul>
          <li>Engaging in fraudulent or harmful behavior.</li>
          <li>Attempting to breach platform security.</li>
          <li>Posting illegal or inappropriate content.</li>
        </ul>
      `,
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      html: `
        <p>All content, trademarks, and assets on the platform are owned by us or licensed to us. Unauthorized use is prohibited.</p>
      `,
    },
    {
      id: "termination",
      title: "6. Termination",
      html: `
        <p>We may suspend or terminate your account for violations of these Terms or misuse of our platform.</p>
      `,
    },
    {
      id: "liability",
      title: "7. Limitation of Liability",
      html: `
        <p>We are not responsible for any indirect, incidental, or consequential damages arising from platform use.</p>
      `,
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      html: `
        <p>These Terms are governed by the laws of India. Any disputes will be handled by courts located in Bangalore, India.</p>
      `,
    },
    {
      id: "changes",
      title: "9. Changes to These Terms",
      html: `
        <p>We may update these Terms periodically. Continued use of the platform after updates means you accept the revised Terms.</p>
      `,
    },
  ]);
  
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  </script>
  
  <style scoped>
  .policy-body p,
  .policy-body ul {
    line-height: 1.6;
    font-size: 15px;
  }
  </style>
  