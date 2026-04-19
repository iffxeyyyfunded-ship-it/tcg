// A script to patch all the issues reported
import * as fs from 'fs';
import * as path from 'path';

function fixFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            if (f !== 'node_modules' && f !== '.next') fixFiles(fullPath);
            continue;
        }

        if (!fullPath.endsWith('.tsx') && !fullPath.endsWith('.ts')) continue;
        let content = fs.readFileSync(fullPath, 'utf8');
        let changed = false;

        // Admin: Supabase Cookies
        if (fullPath.includes('tcg-funded-admin') && fullPath.includes('server.ts')) {
            if (content.includes('cookieStore.getAll()')) {
                content = content.replace(/cookieStore\.getAll\(\)/g, '(await cookieStore).getAll()');
                content = content.replace(/cookieStore\.set\(\{/g, '(await cookieStore).set({');
                changed = true;
            }
        }

        // Add explicit any where implicitly typed
        if (fullPath.includes('app\\order\\page.tsx') || fullPath.includes('app/order/page.tsx')) {
            if (content.includes('(a) =>')) content = content.replace(/\(a\) =>/g, '(a: any) =>');
            if (content.includes('(addon) =>')) content = content.replace(/\(addon\) =>/g, '(addon: any) =>');
            changed = true;
        }

        if (fullPath.includes('AddOns.tsx')) {
            if (content.includes('(addon, i)')) {
                content = content.replace(/\(addon, i\)/g, '(addon: any, i: any)');
                changed = true;
            }
        }

        if (fullPath.includes('ComparisonTable.tsx')) {
            if (content.includes('(row, i)')) {
                content = content.replace(/\(row, i\)/g, '(row: any, i: any)');
                changed = true;
            }
        }

        if (fullPath.includes('PricingTable.tsx')) {
            if (content.includes('({ size })')) {
                content = content.replace(/\(\{ size \}\)/g, '({ size }: { size: number })');
                changed = true;
            }
        }

        if (fullPath.includes('transparency\\page.tsx') || fullPath.includes('transparency/page.tsx')) {
            if (content.includes('(v) =>')) content = content.replace(/\(v\)/g, '(v: any)');
            changed = true;
        }

        // TCG-Funded: Fixes
        if (fullPath.includes('tcg-funded\\app\\admin\\page.tsx') || fullPath.includes('tcg-funded/app/admin/page.tsx')) {
            if (!content.includes("import Link")) {
                content = "import Link from 'next/link';\n" + content;
                changed = true;
            }
        }

        if (fullPath.includes('tcg-funded\\app\\dashboard\\page.tsx') || fullPath.includes('tcg-funded/app/dashboard/page.tsx')) {
            if (!content.includes("TrendingUp") && content.includes("TrendingUp")) {
                content = content.replace("import { Activity, ShieldCheck, UserCheck } from 'lucide-react'", "import { Activity, ShieldCheck, UserCheck, TrendingUp } from 'lucide-react'");
                changed = true;
            }
        }

        // Missing icons fix: Replace Twitter, Instagram, Youtube imports and usages
        if (content.includes('Twitter,') || content.includes('Twitter ') || content.includes('Instagram') || content.includes('Youtube')) {
            content = content.replace(/Twitter, /g, '');
            content = content.replace(/Instagram, /g, '');
            content = content.replace(/Youtube, /g, '');
            content = content.replace(/Twitter/g, 'span');
            content = content.replace(/Instagram/g, 'span');
            content = content.replace(/Youtube/g, 'span');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(fullPath, content);
            console.log('Fixed', fullPath);
        }
    }
}

fixFiles(path.resolve('.'));
