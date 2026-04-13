const TemplatePicker = ({ templates, selected, onSelect }) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
    {Object.keys(templates).map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => onSelect(category)}
        className={`rounded-xl border px-4 py-2 text-sm ${
          selected === category ? "border-brand bg-brand/20" : "border-slate-700 bg-slate-900"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default TemplatePicker;
