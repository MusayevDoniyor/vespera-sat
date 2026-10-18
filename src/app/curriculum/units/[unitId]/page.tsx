import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getKhanFullUnit, getAllKhanUnitIds } from "@/lib/khan-textbook-units";
import UnitTextbookClient from "@/components/UnitTextbookClient";

export async function generateStaticParams() {
  const ids = getAllKhanUnitIds();
  return ids.map((unitId) => ({ unitId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitId: string }>;
}): Promise<Metadata> {
  const { unitId } = await params;
  const unit = getKhanFullUnit(unitId);
  if (!unit) {
    return { title: "Unit Not Found | Vespera SAT" };
  }
  return {
    title: `${unit.title} | Vespera SAT Curriculum`,
    description: unit.description_uz,
  };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  const unit = getKhanFullUnit(unitId);

  if (!unit) {
    notFound();
  }

  return <UnitTextbookClient unit={unit} />;
}
