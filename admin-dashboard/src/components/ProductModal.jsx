import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const EMPTY = { name: '', description: '', price: '', discount_price: '', stock: '', category_id: '', image: '', is_featured: false, is_popular: false };

export default function ProductModal({ open, onClose, onSave, categories, initial }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? {
      ...EMPTY, ...initial,
      price: initial.price ?? '', discount_price: initial.discount_price ?? '', stock: initial.stock ?? '',
      category_id: initial.category_id ?? '',
    } : EMPTY);
  }, [initial, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function submit(e) {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      discount_price: form.discount_price ? Number(form.discount_price) : null,
      stock: Number(form.stock),
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto animate-popIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-900/5 sticky top-0 bg-white rounded-t-xl2">
          <h3 className="font-display font-bold text-lg text-navy-900">{initial?.id ? 'Edit Produk' : 'Tambah Produk'}</h3>
          <button onClick={onClose} className="text-plum-400 hover:text-navy-900"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Nama Produk</label>
            <input name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Hoodie with Pocket" />
          </div>
          <div>
            <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Deskripsi</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input-field resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Harga (Rp)</label>
              <input name="price" type="number" min="0" required value={form.price} onChange={handleChange} className="input-field font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Harga Diskon (opsional)</label>
              <input name="discount_price" type="number" min="0" value={form.discount_price} onChange={handleChange} className="input-field font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Stok Unit</label>
              <input name="stock" type="number" min="0" required value={form.stock} onChange={handleChange} className="input-field font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-plum-500 mb-1.5 block">Kategori</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} className="input-field">
                <option value="">Pilih kategori</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-plum-500 mb-1.5 block">URL Gambar</label>
            <input name="image" value={form.image} onChange={handleChange} className="input-field" placeholder="https://..." />
          </div>
          <div className="flex gap-5 pt-1">
            <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="rounded accent-brand-500" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
              <input type="checkbox" name="is_popular" checked={form.is_popular} onChange={handleChange} className="rounded accent-brand-500" />
              Populer
            </label>
          </div>
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Batal</button>
            <button type="submit" className="btn-primary flex-1">Simpan &amp; Sinkronkan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
