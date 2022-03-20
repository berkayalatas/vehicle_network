import { useState, useEffect } from "react";

export default function Dropdown({ cars, setCars }) {
  const [selected, setSelected] = useState("");

  /* Filtering according to power type */

  const sortedByPower = cars.sort((c) => c.car["power"] === selected);
  console.log(sortedByPower);

  return (
    <select
      id="city"
      name="city"
      type="text"
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        setCars([...sortedByPower]);
      }}
      className="
        w-32 text-lg py-2 border-2 border-blue-100  focus:border-blue-200
        focus:ring-blue-500 h-full pl-2 pr-7 bg-transparent text-gray-500 sm:text-sm rounded-md"
    >
      <option defaultValue value="">
        Power Type
      </option>
      <option value="Gas">Gas</option>
      <option value="Electric">Electric</option>
      <option value="Hybrid">Hybrid</option>
    </select>

    // <Listbox
    //   value={selected}
    //   onChange={() => {
    //     filteredByPower(selected.type);
    //   }}
    // >
    //   {({ open }) => (
    //     <>
    //       <div className="mt-1 relative">
    //         <Listbox.Button
    //           className="relative w-32 bg-white border border-gray-300
    //          rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1
    //          focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         >
    //           <span className="flex items-center">
    //             <span className="ml-3 block truncate">{selected.type}</span>
    //           </span>
    //           <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    //             <SelectorIcon
    //               className="h-5 w-5 text-gray-400"
    //               aria-hidden="true"
    //             />
    //           </span>
    //         </Listbox.Button>

    //         <Transition
    //           show={open}
    //           as={Fragment}
    //           leave="transition ease-in duration-100"
    //           leaveFrom="opacity-100"
    //           leaveTo="opacity-0"
    //         >
    //           <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
    //             {powerType.map((power) => (
    //               <Listbox.Option
    //                 key={power.id}
    //                 className={({ active }) =>
    //                   classNames(
    //                     active ? "text-white bg-blue-600" : "text-gray-900",
    //                     "cursor-default select-none relative py-2 pl-3 pr-9"
    //                   )
    //                 }
    //                 value={power}
    //               >
    //                 {({ selected, active }) => (
    //                   <>
    //                     <div className="flex items-center">
    //                       <span
    //                         className={classNames(
    //                           selected ? "font-semibold" : "font-normal",
    //                           "ml-3 block truncate"
    //                         )}
    //                       >
    //                         {power.type}
    //                       </span>
    //                     </div>

    //                     {selected ? (
    //                       <span
    //                         className={classNames(
    //                           active ? "text-white" : "text-blue-600",
    //                           "absolute inset-y-0 right-0 flex items-center pr-4"
    //                         )}
    //                       >
    //                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                       </span>
    //                     ) : null}
    //                   </>
    //                 )}
    //               </Listbox.Option>
    //             ))}
    //           </Listbox.Options>
    //         </Transition>
    //       </div>
    //     </>
    //   )}
    // </Listbox>
  );
}
