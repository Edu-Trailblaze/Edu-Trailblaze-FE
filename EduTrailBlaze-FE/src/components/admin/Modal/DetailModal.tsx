import React from "react";

type DetailProps<T> = {
    item: T | null;
    onClose: () => void;
    fields: { label: string; accessor: keyof T }[];
};

export default function Detail<T>({ item, onClose, fields }: DetailProps<T>) {
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">{item[fields[0].accessor] as string}</h2>
                <div className="space-y-2">
                    {fields.map(({ label, accessor }) => (
                        <p key={String(accessor)}>
                            <strong>{label}:</strong> {String(item[accessor])}
                        </p>
                    ))}
                </div>
                <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
}
