import Link from "next/link";

export default function Modal({isOpen, onClose, onAccept}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg">
        <div className="bg-purple-600 text-white px-4 py-3 rounded-t">
          <h3 className="text-xl font-semibold">闇の契約</h3>
        </div>
        <div className="p-4">
          <p className="text-lg mb-4">汝、我が組し未来を見事成し遂げたか...？</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
            >
              御免
            </button>
            <Link href={"/home"}>
              <button
                onClick={onAccept}
                className="px-4 py-2 bg-white text-purple-700 border border-purple-700 rounded hover:bg-purple-100 transition-colors"
              >
                ああ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};