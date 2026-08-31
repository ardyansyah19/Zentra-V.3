import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/theme_provider.dart';
import '../auth/login_screen.dart';
import 'favorites_screen.dart';
import 'orders_screen.dart';
import 'addresses_screen.dart';
import 'account_details_screen.dart';
import 'notifications_screen.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final themeProvider = context.watch<AppThemeProvider>();
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Account'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const NotificationsScreen())),
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 30),
          children: [
            Center(
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 42,
                    backgroundColor: AppColors.brand.withValues(alpha: 0.1),
                    backgroundImage: (user?.avatar != null && user!.avatar!.isNotEmpty) ? NetworkImage(user.avatar!) : null,
                    child: (user?.avatar == null || user!.avatar!.isEmpty)
                        ? Text(user?.name.substring(0, 1).toUpperCase() ?? '?', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: AppColors.brand))
                        : null,
                  ),
                  const SizedBox(height: 12),
                  Text(user?.name ?? 'Pengguna', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontSize: 18)),
                  const SizedBox(height: 2),
                  Text(user?.email ?? '', style: const TextStyle(color: AppColors.plumLight, fontSize: 13)),
                ],
              ),
            ),
            const SizedBox(height: 28),
            _MenuTile(
              icon: Icons.favorite_border_rounded,
              label: 'Favorites',
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const FavoritesScreen())),
            ),
            _MenuTile(
              icon: Icons.receipt_long_outlined,
              label: 'Orders',
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const OrdersScreen())),
            ),
            _MenuTile(
              icon: Icons.location_on_outlined,
              label: 'Addresses',
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const AddressesScreen())),
            ),
            _MenuTile(
              icon: Icons.person_outline_rounded,
              label: 'Account Details',
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const AccountDetailsScreen())),
            ),
            Container(
              margin: const EdgeInsets.only(top: 4, bottom: 4),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              decoration: BoxDecoration(color: Theme.of(context).cardTheme.color, borderRadius: BorderRadius.circular(16)),
              child: SwitchListTile(
                contentPadding: EdgeInsets.zero,
                secondary: Container(
                  padding: const EdgeInsets.all(9),
                  decoration: BoxDecoration(color: AppColors.brand.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(11)),
                  child: const Icon(Icons.dark_mode_outlined, size: 18, color: AppColors.brand),
                ),
                title: const Text('Mode Gelap', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                value: themeProvider.isDark,
                activeColor: AppColors.brand,
                onChanged: (_) => themeProvider.toggle(),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.brand),
                onPressed: () async {
                  await auth.logout();
                  if (context.mounted) {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (_) => const LoginScreen()), (route) => false,
                    );
                  }
                },
                child: const Text('Log Out'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MenuTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  const _MenuTile({required this.icon, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(color: Theme.of(context).cardTheme.color, borderRadius: BorderRadius.circular(16)),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(9),
          decoration: BoxDecoration(color: AppColors.brand.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(11)),
          child: Icon(icon, size: 18, color: AppColors.brand),
        ),
        title: Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
        trailing: const Icon(Icons.chevron_right_rounded, color: AppColors.plumLight),
      ),
    );
  }
}
