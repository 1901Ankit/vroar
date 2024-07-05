import { PAY_STATUS, WORK_MODE } from "@/utils/enum";

let filters = [
  {
    name: "Industry",
    key: "industry",
    value: [
      "IT Services and IT Consulting",

      "Hospitals and Health Care",

      "Education Administration Programs",

      "Government Administration",

      "Advertising Services",

      "Accounting",

      "Oil and Gas",

      "Wellness and Fitness Services",

      "Food and Beverage Services",

      "Technology, Information and Internet",

      "Appliances, Electrical, and Electronics Manufacturing",

      "Business Consulting and Services",

      "Primary and Secondary Education",

      "Transportation, Logistics, Supply Chain and Storage",

      "Retail Apparel and Fashion",

      "Food and Beverage Manufacturing",

      "Staffing and Recruiting",

      "Architecture and Planning",
    ],
  },
  {
    name: "Work Mode",
    value: [WORK_MODE.Hybrid, WORK_MODE.ON_SITE, WORK_MODE.REMOTE],
    key: "workMode",
  },

  {
    name: "Internship Type",
    key: "payStatus",
    value: [PAY_STATUS.PAID, PAY_STATUS.UNPAID],
  },
];
export default filters;
