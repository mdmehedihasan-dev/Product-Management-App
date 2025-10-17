
export default function ConfirmationModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#0D1821] p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-2 text-[#AD8A64]">{title}</h2>
        <p className="mb-4 text-[#EFF1F3]">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-[#4E6E5D] rounded text-white">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-[#A44A3F] rounded text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}
