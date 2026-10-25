/*
  EDIT THIS FILE BEFORE PUBLISHING.
  1. Change businessName.
  2. Add your phone number with country code, digits only (India: 91XXXXXXXXXX).
  3. Add your email and full address.
  4. Set mapsQuery to your exact business address or Google Maps place name.
  5. Add the public link to your Google Feedback Form.
*/
const BUSINESS = {
  businessName: "Your Decoration Name",
  phone: "919964483402", // India country code + phone number, digits only
  displayPhone: "+91 99644 83402",
  email: "amrut.tellur51@gmail.com",
  address: "Adarsh Nagar, Kalaburagi, Karnataka 585105",
  mapsQuery: "Adarsh Nagar, Kalaburagi, Karnataka 585105",
  feedbackFormUrl: "https://forms.google.com/" // Replace with your own published Google Form link
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function buildWhatsAppUrl() {
  const number = BUSINESS.phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${BUSINESS.businessName}, I would like to enquire about decoration. Event type: ____. Event date: ____. Venue/location: ____. Budget: ____.`
  );
  if (!number || number.includes("X") || number.length < 10) return "https://wa.me/";
  return `https://wa.me/${number}?text=${message}`;
}

function initBusinessDetails() {
  document.title = `${BUSINESS.businessName} | Wedding & Event Decoration`;
  setText("brandName", BUSINESS.businessName);
  setText("footerBrand", BUSINESS.businessName);
  setText("copyrightName", BUSINESS.businessName);
  setText("phoneText", BUSINESS.displayPhone);
  setText("emailText", BUSINESS.email);
  setText("addressText", BUSINESS.address);
  setText("year", new Date().getFullYear());

  const phoneLink = document.getElementById("phoneLink");
  if (phoneLink && BUSINESS.phone && !BUSINESS.phone.includes("X")) {
    phoneLink.href = `tel:+${BUSINESS.phone.replace(/\D/g, "")}`;
  }

  const emailLink = document.getElementById("emailLink");
  if (emailLink) emailLink.href = `mailto:${BUSINESS.email}`;

  const whatsAppUrl = buildWhatsAppUrl();
  ["heroWhatsApp", "whatsappLink", "bottomWhatsApp", "floatingWhatsApp"].forEach(id => {
    const link = document.getElementById(id);
    if (link) link.href = whatsAppUrl;
  });

  const mapQuery = encodeURIComponent(BUSINESS.mapsQuery || BUSINESS.address);
  const mapFrame = document.getElementById("mapFrame");
  const mapOpenLink = document.getElementById("mapOpenLink");
  if (mapFrame) mapFrame.src = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  if (mapOpenLink) mapOpenLink.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const feedbackLink = document.getElementById("feedbackLink");
  if (feedbackLink) feedbackLink.href = BUSINESS.feedbackFormUrl;
}

function initServiceFilters() {
  const buttons = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".service-card");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      cards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initBusinessDetails();
  initServiceFilters();
  initMobileMenu();
});
