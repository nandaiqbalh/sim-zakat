"use client";
// components/docs/DocsPageNav.jsx — prev/next navigation at bottom of docs page

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocsPageNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 transition-colors group text-sm"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-green-700 shrink-0" />
          <div className="text-left">
            <p className="text-xs text-gray-400">Sebelumnya</p>
            <p className="font-medium text-gray-800 group-hover:text-green-800">{prev.label}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 transition-colors group text-sm sm:text-right"
        >
          <div className="text-right flex-1">
            <p className="text-xs text-gray-400">Berikutnya</p>
            <p className="font-medium text-gray-800 group-hover:text-green-800">{next.label}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-700 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
