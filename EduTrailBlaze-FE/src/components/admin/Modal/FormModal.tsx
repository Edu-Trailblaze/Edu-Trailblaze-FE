import React, { useState } from "react";

type FormProps<T> = {
    initialValues: T;
    fields: { label: string; accessor: keyof T; type: string }[];
    onSubmit: (values: T) => void;
    onCancel: () => void;
};

export default function Form<T>({ initialValues, fields, onSubmit, onCancel }: FormProps<T>) {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleChange = (key: keyof T, value: string | number) => {
        setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    const isEditMode = Boolean((initialValues as any).id); // Nếu có id thì là update

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">{isEditMode ? "Update Course" : "Create Course"}</h2>
                <div className="flex flex-col gap-4">
                    {fields.map(({ label, accessor, type }) => (
                        <div key={String(accessor)}>
                            {accessor === "difficultyLevel" ? (
                                <select
                                    value={formValues[accessor] as string}
                                    onChange={(e) => handleChange(accessor, e.target.value)}
                                    className="p-2 border rounded-md w-full"
                                >
                                    <option value="">Select Difficulty</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    placeholder={label}
                                    value={String(formValues[accessor])}
                                    onChange={(e) => handleChange(accessor, e.target.value)}
                                    className="p-2 border rounded-md w-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-md">
                        Cancel
                    </button>
                    <button onClick={() => onSubmit(formValues)} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                        {isEditMode ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
