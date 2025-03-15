"use client";
import { Asterisk, Plus, X } from "lucide-react";
import { useState } from "react";

type ArrayItemsInputProps = {
  items: string[];
  setItems: (items: string[]) => void;
  itemTitle: string;
};

const ArrayItemsInput = ({ items, setItems, itemTitle }: ArrayItemsInputProps) => {
  const [itemState, setItemState] = useState({
    showItems: false,
    item: "",
  });

  const handleAddItem = () => {

    if (!itemState.item) return;


    setItems([...items, itemState.item]);
    setItemState({ ...itemState, item: "" });
  };

  const handleRemoveItem = (index: number | string) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="sm:col-span-2">
      {itemState.showItems ? (
        <div className="flex items-center ">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Asterisk
                size={24}
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
            </div>
            <input
              value={itemState.item}
              onChange={(e) =>
                setItemState({ ...itemState, item: e.target.value })
              }
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              placeholder={`Create a new ${itemTitle}`}
            />
          </div>
          <button
            onClick={handleAddItem}
            type="button"
            className="inline-flex items-center py-2 px-3 ms-1.5 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            <Plus size={24} />
            <span className="ms-1">Add</span>
          </button>

          <button
            className="py-1.5 px-1.5 bg-red-400 text-white rounded-lg ml-2"
            onClick={() =>
              setItemState({ ...itemState, showItems: !itemState.showItems })
            }
          >
            <X />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center space-x-2 text-sm font-medium text-slate-800 dark:text-slate-300"
          onClick={() =>
            setItemState({ ...itemState, showItems: !itemState.showItems })
          }
        >
          <Plus size={24} />
          <span>Add {itemTitle} </span>
        </button>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((t, i) => {
          return (
            <div
              key={i}
              className="flex items-center
            space-x-2 dark:bg-slate-600 bg-slate-200 dark:text-slate-300 text-slate-800 px-4 py-2 rounded-lg"
            >
              <p>
                {t}
                <button type="button" onClick={() => handleRemoveItem(i)}>
                  <X className="w-4 h-4" />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArrayItemsInput;

