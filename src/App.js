import "./App.css";
import React, { useState, useMemo } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-json'; // Import JSON language grammar
import './prism-custom.css';

function formatJsonString(jsonString) {
  try {
    const jsonObject = JSON.parse(jsonString);
    return JSON.stringify(jsonObject, null, 2);
  } catch (error) {
    console.error("Invalid JSON string", error);
    return jsonString;
  }
}

const oldCode = formatJsonString(`
{
  "source": {
    "type": "card",
    "number": "4242424242424242",
    "expiry_month": 12,
    "expiry_year": 2025,
    "cvv": "257"
  },
  "amount": 307.17,
  "currency": "USD",
  "shipping": {
    "address": {
      "address_line1": "123 Example St",
      "city": "San Francisco",
      "state": "CA"
    },
    "phone": "+1-415-555-0123",
    "recipient_name": "John Doe"
  },
  "reference": "ORD-5023-4E89",
  "description": "Set of 3 masks",
  "capture": true
}
`);
const newCode = formatJsonString(`
{
  "source": {
    "type": "card",
    "number": "4242424242424242",
    "expiry_month": 12,
    "expiry_year": 2025,
    "cvv": "257"
  },
  "amount": 307.17,
  "currency": "USD",
  "shipping": {
    "address": {
      "address_line1": "123 Example St",
      "city": "San Francisco",
      "shipping_postcode": "12345",
      "state": "CA"
    },
    "phone": "+1-415-555-0123",
    "recipient_name": "John Doe"
  },
  "reference": "ORD-5023-4E89",
  "description": "Set of 3 masks",
  "capture": true
}
`);

const newStyles = {
  gutter: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
};

const Toggle = ({ onChange, checked }) => {
  return (
    <label className="switch">
      <input onChange={onChange} type="checkbox" checked={checked} />
      <span className="slider round"></span>
    </label>
  );
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(newCode).then(() => {
    alert('Content copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
} 

const highlightSyntax = (str) => {
  const filteredStr = str ? str : '';
  console.log(filteredStr);
  return (
    <pre
      style={{ display: 'inline' }}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(filteredStr, Prism.languages.json, 'json'),
      }}
    />
  );
};

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      {/* https://ui-toolkit-storybook.vercel.app/?path=/docs/switch--docs */}
      <Toggle
        onChange={() => {
          setToggle(!toggle);
        }}
        checked={toggle}
      />
      {/* https://ui-toolkit-storybook.vercel.app/?path=/docs/copytoclipboardbutton--docs */}
      <button onClick={copyToClipboard}>Copy</button>
      {/* https://www.npmjs.com/package/react-diff-viewer-continued */}
      <ReactDiffViewer
        oldValue={oldCode}
        styles={!toggle ? newStyles : {}}
        newValue={!toggle ? oldCode : newCode}
        hideMarkers={!toggle ? true : false}
        splitView={!toggle ? false : true}
        showDiffOnly={false} // for the expand lines stuff
        useDarkTheme={true}
        renderContent={highlightSyntax}
      />
    </div>
  );
}

export default App;