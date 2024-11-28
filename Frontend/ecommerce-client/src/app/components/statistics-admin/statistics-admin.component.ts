import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/Order.service';

@Component({
  selector: 'app-statistics-admin',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.scss']
})
export class StatisticsAdminComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
  
  // Chart for Product Sales
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Ventas de Productos',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    }
  };

  
  // Chart for Orders per Day
  orderChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Órdenes por Día',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        tension: 0.3,
        fill: true
      }
    ]
  };
  orderChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    },
    
  };

  constructor(
    private _productService: ProductService,
    private _orderService: OrderService
  ) {
    // Registrar componentes de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrder();
  }

  loadProducts(): void {
    this._productService.getProducts().subscribe({
      next: (result: Product[]) => {
        this.products = result;
        console.log(this.products);
        this.prepareChartData();
      },
      error: (error: any) => {
        console.error('Error al obtener productos:', error);
      },
      complete: () => {
        console.log('Productos cargados exitosamente');
      }
    });
  }

  loadOrder(): void {
    this._orderService.getOrders().subscribe({
      next: (result: any) => {
        this.orders = result;
        console.log(result);
        this.prepareOrderChartData();
      },
      error: (error: any) => {
        console.error('Error al recuperar órdenes:', error);
      },
      complete: () => {
        console.log('Órdenes cargadas exitosamente');
      }
    });
  }

  prepareChartData(): void {
    const categoryMap: { [key: string]: number } = {};
    this.products.forEach((product) => {
      const categoryName = product.name;
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = 0;
      }
      categoryMap[categoryName] += product.n_sales;
    });

    this.chartData.labels = Object.keys(categoryMap);
    this.chartData.datasets[0].data = Object.values(categoryMap);
  
  }

  prepareOrderChartData(): void {
    const orderDateMap: { [key: string]: number } = {};
    this.orders.forEach((order) => {
      const date = new Date(order.date).toISOString().split('T')[0]; // Formato YYYY-MM-DD
      if (!orderDateMap[date]) {
        orderDateMap[date] = 0;
      }
      orderDateMap[date]++;
    });

    this.orderChartData.labels = Object.keys(orderDateMap).sort(); // Fechas ordenadas
    this.orderChartData.datasets[0].data = Object.values(orderDateMap);
  }
}
