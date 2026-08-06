import React from "react";
import { motion } from "framer-motion";
import { Flask } from "@phosphor-icons/react";
import StatusBadge from "../StatusBadge";
import { FADE_UP, TRANSITION } from "../../motion";

const COLUMNS = ["Test", "Result", "Reference range", "Status"];

export default function LabValuesTable({ values }) {
  if (!values?.length) return null;

  return (
    <motion.section
      {...FADE_UP}
      transition={TRANSITION.delay20}
      className="rounded-4xl border border-line bg-white p-6 md:p-8 shadow-card"
    >
      <div className="flex items-center gap-2.5">
        <Flask size={20} weight="duotone" className="text-sage" />
        <h2 className="font-display text-2xl tracking-tight text-ink">Your values</h2>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table data-testid="lab-values-table" className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-ink">
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="pb-4 px-2 font-display text-lg text-ink font-normal whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => (
              <tr
                key={`${value.name}-${value.value}`}
                data-testid={`lab-row-${index}`}
                className="border-b border-line transition-colors hover:bg-canvas/60"
              >
                <td className="py-4 px-2">
                  <p className="font-medium text-ink">{value.name}</p>
                  {value.plain_meaning && (
                    <p className="mt-1 text-xs text-ink3 max-w-xs leading-relaxed">
                      {value.plain_meaning}
                    </p>
                  )}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-ink">
                  <span className="font-display text-xl">{value.value}</span>{" "}
                  <span className="text-sm text-ink2">{value.unit}</span>
                </td>
                <td className="py-4 px-2 text-sm text-ink2 whitespace-nowrap">
                  {value.reference_range || "—"}
                </td>
                <td className="py-4 px-2">
                  <StatusBadge status={value.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
