# 🇨🇦 Express Entry Dashboard

**Express Entry Dashboard** is a React-based web application that visualizes trends in Canada's Express Entry immigration system. It provides interactive graphs for CRS score distributions, draw sizes, and pool trends, helping users gain insights into historical patterns across various programs and categories.

![screenshot](./public/screenshot.png) <!-- Optional: Add a screenshot if available -->

---

## 📊 Features

- 📈 Interactive CRS Score trends per program
- 📅 Historical draw size visualization
- 🧑‍💻 Category-based and program-specific views (e.g., CEC, FSW, PNP)
- 📁 JSON data served from Azure Blob Storage
- 📱 Responsive design with mobile-friendly layouts
- 🎨 Theme customization via Ant Design v5 token system

---

## 🚀 Tech Stack

- **React** (with CRA)
- **Ant Design** (custom theming with tokens)
- **Plotly.js** (interactive charts)
- **Redux** (state management with persistence)
- **Azure Blob Storage** (data hosting)
- **TypeScript** (optional: enable if your project uses it)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ee-dashboard.git
cd ee-dashboard
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Set Environment Variables

Create a .env file in the root directory with the following:
```bash
REACT_APP_DATA_CRS_ENDPOINT_URL=https://<your-storage-url>/data/processed_data_crs_trend.json
REACT_APP_DATA_POOL_ENDPOINT_URL=https://<your-storage-url>/data/processed_data_pool_trend.json
REACT_APP_DATA_INVITATION_ENDPOINT_URL=https://<your-storage-url>/data/processed_data_draw_size.json
```
🔒 Make sure the blob container allows public read access or is proxy-served securely via your backend.

### 4. Start the App

```bash
npm start
```
Open your browser at: `http://localhost:3000`

## 🧪 Available Scripts


| Command | Description|
| --------------------- | ---------- | 
| `npm start`	| Run the app in development mode|
| `npm run build`	|Build the app for production|
| `npm test`	| Launch the test runner|
| `npm run eject`	| Eject configuration (not recommended)|


## 📂 Folder Structure (simplified)
```bash
src/
├── components/
├── configs/
│   └── AppConfig.js
├── redux/
│   └── store.js
├── views/
│   └── CRSScoreTrend.tsx
├── App.tsx
├── index.tsx
```

## 📈 Sample Graphs
- CRS Trend by Program
- Pool Trend Over Time
- Invitation Trend Over Time

All charts are rendered using `react-plotly.js` and are fully interactive and responsive.

## 🧩 Data Backend

The processed trend data is generated and pushed by the ee-core backend as static JSON files to Azure Blob Storage. The frontend reads them via direct HTTP fetch.

## 📄 License

MIT

## 👤 Maintainer

Built by [Habibur Rahman](https://habibrahman.me) with ❤️ for the 🇨🇦 Canadian immigration tech community.