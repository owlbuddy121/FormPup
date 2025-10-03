# 🐾 FormPup

**FormPup** is a lightweight, flexible, and powerful **React Form Builder** that allows developers to create beautiful, dynamic forms effortlessly.  
With drag-and-drop functionality, schema-driven rendering, and support for custom fields, FormPup makes form building fun and efficient — like having a loyal pup by your side! 🐶

[![NPM Version](https://img.shields.io/npm/v/formpup)](https://www.npmjs.com/package/formpup)
[![License](https://img.shields.io/npm/l/formpup)](LICENSE)

---

## 🚀 Features

- 🛠 **Drag & Drop Builder** – Create forms visually with an intuitive interface.  
- 📄 **Schema-Driven Forms** – Export and render forms using JSON schema.  
- 🎨 **Customizable Themes** – Supports Tailwind, Material UI, and Chakra UI.  
- ✨ **Rich Field Types** – Text, Number, Select, Radio, Checkbox, Date/Time, File Upload, Rating/Slider, Sections & Headings.  
- 🔄 **Conditional Logic** – Show or hide fields based on other field values.  
- 🐾 **Custom Field Support** – Easily extend the builder with your own field components.  
- 💾 **Auto Save** – Keep form progress locally, prevent data loss.  
- 🌍 **Multi-Step Forms** – Build forms with multiple steps or tabs.  
- ✅ **Validation** – Built-in rules plus custom validator support.  

---

## 📦 Installation

Install FormPup via NPM or Yarn:

```bash
npm install formpup
# or
yarn add formpup
````

---

## 🖥 Usage

### 1. Import the Form Builder

```javascript
import { FormBuilder, FormRenderer } from 'formpup';
import 'formpup/dist/formpup.css';
```

### 2. Using FormBuilder

```jsx
<FormBuilder
  initialSchema={initialSchema}
  onSchemaChange={(updatedSchema) => console.log(updatedSchema)}
/>
```

### 3. Rendering a Form

```jsx
<FormRenderer
  schema={formSchema}
  onSubmit={(data) => console.log('Form submitted:', data)}
/>
```

---

## ⚙️ Customization

* **Themes:** Pass a theme prop (`'tailwind' | 'material' | 'chakra'`).
* **Custom Fields:** Extend with your own React components.
* **Validation:** Use built-in rules or provide your own validator functions.

---

## 📚 Examples

Check out the **examples folder** for ready-to-use demos:

* Basic Form
* Multi-Step Form
* Conditional Fields Form
* Custom Field Components

---

## 🤝 Contributing

FormPup is open-source and community-driven!
We welcome contributions, bug fixes, and feature requests.

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🐶 Stay Connected

Follow the journey of FormPup and stay updated:

* [GitHub Repository](https://github.com/yourusername/formpup)
* [NPM Package](https://www.npmjs.com/package/formpup)

---

**FormPup** — making form building fun, fast, and friendly! 🐾

```

---

This README is:  
- **Catchy & Fun** (matches FormPup vibe)  
- **Professional & Complete** (installation, usage, features, contribution)  
- **SEO-friendly & GitHub-ready** (badges, headings, clear structure)  
