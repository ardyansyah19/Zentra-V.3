import 'package:flutter/material.dart';
import '../config/theme.dart';

class SectionHeader extends StatelessWidget {
  final String title;
  final VoidCallback? onSeeAll;
  const SectionHeader({super.key, required this.title, this.onSeeAll});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          if (onSeeAll != null)
            GestureDetector(
              onTap: onSeeAll,
              child: const Text('Lihat Semua', style: TextStyle(color: AppColors.brand, fontWeight: FontWeight.w600, fontSize: 12.5)),
            ),
        ],
      ),
    );
  }
}

class CategoryChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const CategoryChip({super.key, required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 9),
        margin: const EdgeInsets.only(right: 8),
        decoration: BoxDecoration(
          color: selected ? AppColors.brand : (isDark ? AppColors.navy800 : Colors.white),
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: selected ? AppColors.brand : AppColors.plumLight.withValues(alpha: 0.25)),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : (isDark ? Colors.white70 : AppColors.plum),
            fontWeight: FontWeight.w600,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}

class RatingStars extends StatelessWidget {
  final double rating;
  final double size;
  const RatingStars({super.key, required this.rating, this.size = 15});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (i) {
        IconData icon;
        if (rating >= i + 1) {
          icon = Icons.star_rounded;
        } else if (rating > i) {
          icon = Icons.star_half_rounded;
        } else {
          icon = Icons.star_border_rounded;
        }
        return Icon(icon, size: size, color: AppColors.amber);
      }),
    );
  }
}

/// Banner kecil yang muncul saat menerima update realtime dari admin
/// (contoh: perubahan harga/stok) — bukti visual fitur sinkronisasi.
class SyncBanner extends StatelessWidget {
  final String message;
  const SyncBanner({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.mint.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.mint.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          const Icon(Icons.sync_rounded, size: 16, color: AppColors.mint),
          const SizedBox(width: 8),
          Expanded(child: Text(message, style: const TextStyle(fontSize: 12.5, color: AppColors.mint, fontWeight: FontWeight.w600))),
        ],
      ),
    );
  }
}
