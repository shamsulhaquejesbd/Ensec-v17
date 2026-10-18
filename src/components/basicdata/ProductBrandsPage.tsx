import React, { useState } from 'react';
import {
  Award,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Check,
  Package,
  Sparkles,
} from 'lucide-react';
import { useERP } from '../../context/ERPContext.tsx';
import { ProductBrand } from '../../types/erp.ts';

export const ProductBrandsPage: React.FC = () => {
  const {
    products,
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
  } = useERP();

  // Search
  const [brandSearch, setBrandSearch] = useState('');

  // Modals for Brands
  const [showCreateBrandModal, setShowCreateBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<ProductBrand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<ProductBrand | null>(null);
  const [brandName, setBrandName] = useState('');
  const [brandCode, setBrandCode] = useState('');
  const [brandOrigin, setBrandOrigin] = useState('Bangladesh (Kushtia Assembly Plant)');
  const [brandTagline, setBrandTagline] = useState('');
  const [brandStatus, setBrandStatus] = useState<'Active' | 'Inactive'>('Active');

  // Filtered Brands
  const filteredBrands = brands.filter((b) => {
    const q = brandSearch.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.code.toLowerCase().includes(q) ||
      b.origin.toLowerCase().includes(q)
    );
  });

  const handleOpenCreateBrand = () => {
    setBrandCode(`BRD-0${brands.length + 1}`);
    setBrandName('');
    setBrandOrigin('Bangladesh (Kushtia Assembly Plant)');
    setBrandTagline('');
    setBrandStatus('Active');
    setShowCreateBrandModal(true);
  };

  const handleCreateBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !brandCode) return;
    addBrand({
      code: brandCode,
      name: brandName,
      origin: brandOrigin,
      tagline: brandTagline,
      status: brandStatus,
    });
    setShowCreateBrandModal(false);
  };

  const handleUpdateBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;
    updateBrand(editingBrand.id, {
      code: editingBrand.code,
      name: editingBrand.name,
      origin: editingBrand.origin,
      tagline: editingBrand.tagline,
      status: editingBrand.status,
    });
    setEditingBrand(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Product Brands & Line Identity
            </h1>
            
          </div>
          
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase flex items-center justify-between">
            <span>Total Brands</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {brands.length} Brands
          </div>
          
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase flex items-center justify-between">
            <span>Active Brands</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {brands.filter((b) => b.status === 'Active').length} Active
          </div>
          
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-slate-500 uppercase flex items-center justify-between">
            <span>Branded SKUs</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {products.length} Products
          </div>
          
        </div>
      </div>

      {/* Main Brands Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>Brands Directory</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {filteredBrands.length} Brands
              </span>
            </h2>
            
          </div>
        </div>

        {/* Brand Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search brands by name, code, origin, or tagline..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>

        {/* Grid of Brands */}
        {filteredBrands.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6">
            <Sparkles className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No product brands found</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Your database has 0 product brands. Add a new brand using the button above or sync from Supabase.
            </p>
            <button
              onClick={handleOpenCreateBrand}
              className="mt-4 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white inline-flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Brand</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400">
                        {brand.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">{brand.name}</h3>
                      <p className="text-[11px] text-slate-500">{brand.origin}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        brand.status === 'Active'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {brand.status}
                    </span>
                  </div>

                  {brand.tagline && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                      &quot;{brand.tagline}&quot;
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    ⚡ {products.filter((p) => p.brand === brand.name).length} Products Under Brand
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingBrand(brand)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingBrand(brand)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: CREATE BRAND */}
      {showCreateBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Add New Product Brand
                </h3>
              </div>
              <button
                onClick={() => setShowCreateBrandModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBrandSubmit} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Brand Code *
                </label>
                <input
                  type="text"
                  required
                  value={brandCode}
                  onChange={(e) => setBrandCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                  placeholder="e.g. BRD-ENSEC"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  placeholder="e.g. Ensec Lithium BD"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Country / Plant of Origin *
                </label>
                <input
                  type="text"
                  required
                  value={brandOrigin}
                  onChange={(e) => setBrandOrigin(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  placeholder="e.g. Bangladesh (Kushtia Assembly Plant)"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tagline / Brand Promise
                </label>
                <input
                  type="text"
                  value={brandTagline}
                  onChange={(e) => setBrandTagline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  placeholder="e.g. Engineered for extreme tropical durability..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateBrandModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save Brand</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BRAND */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Edit Product Brand
                </h3>
              </div>
              <button
                onClick={() => setEditingBrand(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateBrandSubmit} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand Code</label>
                <input
                  type="text"
                  required
                  value={editingBrand.code}
                  onChange={(e) => setEditingBrand({ ...editingBrand, code: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Origin / Location</label>
                <input
                  type="text"
                  required
                  value={editingBrand.origin}
                  onChange={(e) => setEditingBrand({ ...editingBrand, origin: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingBrand.tagline || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Status</label>
                <select
                  value={editingBrand.status}
                  onChange={(e) =>
                    setEditingBrand({
                      ...editingBrand,
                      status: e.target.value as 'Active' | 'Inactive',
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBrand(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Brand</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE BRAND */}
      {deletingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 text-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Delete Brand</h3>
              <p className="text-slate-500">
                Are you sure you want to delete brand{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{deletingBrand.name}</span>?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingBrand(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteBrand(deletingBrand.id);
                  setDeletingBrand(null);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
